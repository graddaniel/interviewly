import { v4 as generateUuidV4 } from 'uuid';
import moment from 'moment';
import { AccountTypes, ProfileTypes } from 'shared';
import i18next from 'i18next';
import config from 'config';

import AccountModel from '../../models/account';
import ResetRequestModel from '../../models/password-reset-request';
import RecruiterProfileModel from '../../models/recruiter-profile';
import RespondentProfileModel from '../../models/respondent-profile';
import AccountAlreadyExistsError from './errors/account-already-exists-error';
import AccountNotFoundError from './errors/account-not-found-error';
import IncorrectPasswordError from './errors/incorrect-password-error';
import JWTService from '../jwt-service/jwt-service';
import { getCVBucketKeyByEmail, getOtherFilesBucketKeyByEmail, hash } from '../../utils'
import AccountHasNotRequestedPasswordResetError from './errors/account-has-not-requested-password-reset-error';
import SequelizeConnection from '../sequelize-connection';
import CompanyModel from '../../models/company';
import PasswordResetExpired from './errors/password-reset-expired-error';
import AccountAlreadyActiveError from './errors/account-already-active-error';
import RecruiterAccountMissingCompanyNameError from './errors/recruiter-account-missing-company-name-error';
import RecruiterAccountMissingCompanyDataError from './errors/recruiter-account-missing-company-data-error';
import IncorrectAccountType from './errors/incorrect-account-type';
import ProfileNotFoundError from './errors/profile-not-found-error';
import NotPermittedError from '../../generic/not-permitted-error';
import AccountAlreadyHasPasswordError from './errors/account-already-has-password';
import ProjectModel from '../../models/project';
import S3Adapter from '../s3-adapter';

import type MailService from '../mail-service/mail-service';
import type CompaniesService from '../companies-service/companies-service';
import MQAdapter from '../mq-adapter';
import GPTAdapter from '../gpt-adapter';


export default class AccountsService {
    private mailService: MailService;
    private companiesService: CompaniesService;
    private s3Adapter: S3Adapter;
    private mqAdapter: MQAdapter;
    private gptAdapter: GPTAdapter;

    private cvBucketName: string;
    private otherFilesBucketName: string;
    private additionalNotificationsTarget: string;
    private interviewsToTranscribeQueue: string;
    private recordedInterviewsQueue: string;

    constructor(
        mailService: MailService,
        companiesService: CompaniesService,
        s3Adapter: S3Adapter,
        mqAdapter: MQAdapter,
        gptAdapter: GPTAdapter,
    ) {
        this.mailService = mailService;
        this.companiesService = companiesService;
        this.s3Adapter = s3Adapter;
        this.mqAdapter = mqAdapter;
        this.gptAdapter = gptAdapter;

        this.cvBucketName = config.get('s3.cvBucket');
        this.otherFilesBucketName = config.get('s3.otherFilesBucketName');
        this.additionalNotificationsTarget = config.get('registration.additionalNotificationsTarget');
        this.recordedInterviewsQueue = config.get('rabbitMq.recordedInterviewsQueueName');
        this.interviewsToTranscribeQueue = config.get('rabbitMq.interviewsToTranscribeQueueName');
    }

    getAccount = async (query: Partial<AccountModel>) => {
        const account = await AccountModel.findOne({
            where: {
                ...query,
            },
            include: [{
                model: RecruiterProfileModel,
                include: [CompanyModel],
            }, {
                model: RespondentProfileModel,
            }],
        });

        if (!account) {
            throw new AccountNotFoundError();
        }

        return account;
    }

    assertAccountDoesntExist = async (query: Partial<AccountModel>) => {
        const account = await AccountModel.findOne({
            where: {
                ...query,
            }
        });

        if (account) {
            throw new AccountAlreadyExistsError(account.email);
        }
    }

    login = async (
        email: string,
        password: string
    ): Promise<string> => {
        const account = await this.getAccount({ email });

        const providedPasswordHash = hash(password);
        if (providedPasswordHash !== account.passwordHash) {
            throw new IncorrectPasswordError();
        }

        const userPublicData = await this._getUserPublicData(account);

        return JWTService.sign(userPublicData);
    };

    register = SequelizeConnection.transaction(async ({
        email,
        password,
        type,
        name,
        surname,
        gender,
        newsletter,
        language,
        companyName,
        notify,
        createdFromFile = false,
        recordingId,
    }: {
        email: string,
        password?: string,
        type: AccountTypes.Type,
        name: string,
        surname: string,
        gender: ProfileTypes.Gender,
        newsletter: boolean,
        language: string,
        companyName?: string,
        notify?: boolean,
        createdFromFile?: boolean,
        recordingId?: number,
    }): Promise<string> => {
        await this.assertAccountDoesntExist({ email });

        const newAccount = await this.createAccount({
            email,
            password,
            type,
            name,
            surname,
            gender,
            newsletter,
            companyName,
            createdFromFile,
        });

        if (recordingId) {
            this.mqAdapter.send(this.recordedInterviewsQueue, ""+recordingId);
        }

        this._sendConfirmationEmail(newAccount.uuid, name, email, language, notify);

        return this._getUserPublicData(newAccount);
    });

    private _getUserPublicData = async (
        account: AccountModel
    ) => {
        const userPublicData: any = {
            uuid: account.uuid,
            email: account.email,
            type: account.type,
        };

        if (account.type === AccountTypes.Type.RESPONDENT) {
            return userPublicData;
        }

        const company = await this.companiesService.getCompanyOfAccount(account.uuid);
        if (!company) {
            throw new RecruiterAccountMissingCompanyDataError(account.email);
        }
        userPublicData.companyUuid = company.uuid;

        userPublicData.role = (account as any)?.RecruiterProfile.role;

        return userPublicData;
    }

    createAccount = async ({
        email,
        password,
        type,
        name,
        surname,
        gender,
        newsletter,
        companyName,
        createdFromFile = false,
    }: {
        email: string,
        password?: string,
        type: AccountTypes.Type,
        name: string,
        surname: string,
        gender: ProfileTypes.Gender,
        newsletter: boolean,
        companyName?: string,
        createdFromFile?: boolean,
    }): Promise<AccountModel> => {
        switch (type) {
            case AccountTypes.Type.RESPONDENT:
                return await this.createRespondentAccount({
                    email,
                    password,
                    name,
                    surname,
                    gender,
                    newsletter,
                    createdFromFile,
                });

            case AccountTypes.Type.RECRUITER:
                if (!companyName) {
                    throw new RecruiterAccountMissingCompanyNameError();
                }

                const company = await this.companiesService.create(companyName);

                return await this.createRecruiterAccount({
                    email,
                    password,
                    name,
                    surname,
                    gender,
                    newsletter,
                    company,
                });
        }
    }

    createRespondentAccount = async ({
        email,
        password,
        name,
        surname,
        gender,
        newsletter,
        createdFromFile = false,
        language = 'en',
    }: {
        email: string,
        password?: string,
        name: string,
        surname: string,
        gender: ProfileTypes.Gender,
        newsletter: boolean,
        createdFromFile?: boolean,
        language?: string,
    }): Promise<AccountModel> => {
        const newAccount = await AccountModel.create({
            uuid: generateUuidV4(),
            email,
            passwordHash: password ? hash(password) : null,
            type: AccountTypes.Type.RESPONDENT,
            status: AccountTypes.Status.UNCONFIRMED,
            newsletter,
            RespondentProfile: {
                name,
                surname,
                gender,
                createdFromFile: createdFromFile,
            }
        }, {
            include: [{
                association: AccountModel.associations.RespondentProfileModel,
            }]
        });

        if (!password) {
            this._sendPasswordSetAndConfirmationEmail(
                newAccount.uuid,
                name,
                email,
                language,
                false,
            );
        }

        return newAccount;
    }

    createRecruiterAccount = async ({
        email,
        password,
        name,
        surname,
        gender,
        newsletter,
        company,
        role = ProfileTypes.Role.Admin,
        status = AccountTypes.Status.UNCONFIRMED,
        language = 'en',
    }: {
        email: string,
        password?: string,
        name: string,
        surname: string,
        gender: ProfileTypes.Gender,
        newsletter: boolean,
        company: CompanyModel,
        role?: ProfileTypes.Role,
        status?: AccountTypes.Status,
        language?: string,
    }): Promise<AccountModel> => {
        const newAccount = await AccountModel.create({
            uuid: generateUuidV4(),
            email,
            passwordHash: password ? hash(password) : null,
            type: AccountTypes.Type.RECRUITER,
            status,
            newsletter,
            RecruiterProfile: {
                name,
                surname,
                gender,
                role,
                CompanyId: company.id,
            }
        }, {
            include: [{
                association: AccountModel.associations.RecruiterProfileModel,
            }]
        });

        if (!password) {
            this._sendPasswordSetAndConfirmationEmail(
                newAccount.uuid,
                name,
                email,
                language,
                false,
            );
        }

        return newAccount;
    };

    private _sendConfirmationEmail = async (
        accountUuid: string,
        name: string,
        email: string,
        language: string,
        notify?: boolean,
    ) => {
        const { t } = i18next;

        const subject = t('email.accountCreated_fakedoor.subject', { lng: language });
        const context = {
            welcome: t('email.accountCreated_fakedoor.welcome', { lng: language }),
            name,
            firstParagraph: t('email.accountCreated_fakedoor.paragraphs.first', { lng: language }),
            secondParagraph: t('email.accountCreated_fakedoor.paragraphs.second', { lng: language }),
            thirdParagraph: t('email.accountCreated_fakedoor.paragraphs.third', { lng: language }),
            confirmationLink: `https://interviewlyapp.com/confirm/${accountUuid}`,
            signature: t('email.accountCreated_fakedoor.signature', { lng: language })
        };

        await this.mailService.sendTemplate(email, subject, 'fakedoor', context);


        if (notify) {
            await this.mailService.sendTemplate(
                this.additionalNotificationsTarget,
                subject,
                'fakedoor',
                context,
            );
        }
    };

    private _sendPasswordSetAndConfirmationEmail = async (
        accountUuid: string,
        name: string,
        email: string,
        language: string,
        notify?: boolean,
    ) => { //TODO modify this and add form to handle the link at the frontend, then finish adding the respondents
        const { t } = i18next;

        const subject = t('email.accountCreated_setPassword.subject', { lng: language });
        const context = {
            welcome: t('email.accountCreated_setPassword.welcome', { lng: language }),
            name,
            firstParagraph: t('email.accountCreated_setPassword.paragraphs.first', { lng: language }),
            secondParagraph: t('email.accountCreated_setPassword.paragraphs.second', { lng: language }),
            confirmationLink: `https://interviewlyapp.com/setPassword/${accountUuid}`,
            signature: t('email.accountCreated_setPassword.signature', { lng: language })
        };

        await this.mailService.sendTemplate(
            email,
            subject,
            'set-password-and-confirm-account',
            context
        );


        if (notify) {
            await this.mailService.sendTemplate(
                this.additionalNotificationsTarget,
                subject,
                'set-password-and-confirm-account',
                context,
            );
        }
    };

    editRecruiterAccount = SequelizeConnection.transaction(async (
        currentUserRole: ProfileTypes.Role,
        uuid: string,
        role: ProfileTypes.Role = ProfileTypes.Role.Admin,
        status: AccountTypes.Status = AccountTypes.Status.UNCONFIRMED,
        projectsUuids: string[],
    ) => {
        if (role === ProfileTypes.Role.InterviewlyStaff
            && currentUserRole !== ProfileTypes.Role.InterviewlyStaff) {
            throw new NotPermittedError();
        }

        const account = await this.getAccount({ uuid });
        if (account.type !== AccountTypes.Type.RECRUITER) {
            throw new IncorrectAccountType(account.type);
        }

        const recruiterProfile = account.RecruiterProfile;
        if (!recruiterProfile) {
            throw new ProfileNotFoundError();
        }

        if (recruiterProfile.role === ProfileTypes.Role.InterviewlyStaff
            && currentUserRole !== ProfileTypes.Role.InterviewlyStaff) {
            throw new NotPermittedError();
        }

        if ([
            ProfileTypes.Role.Moderator,
            ProfileTypes.Role.Observer,
            ProfileTypes.Role.Translator,
        ].includes(recruiterProfile.role)) {

            const projects = await ProjectModel.findAll({
                attributes: ['id', 'uuid'],
                where: {
                    uuid: projectsUuids,
                },
            });

            await recruiterProfile.setProjects(projects);
        }

        await account.update({
            status,
        });
        await recruiterProfile.update({
            role,
        });

        await account.save();
        await recruiterProfile.save();
    });

    confirmAccountRegistration = async (
        uuid: string,
    ) => {
        const account = await this.getAccount({ uuid });

        if (account.status === AccountTypes.Status.ACTIVE) {
            throw new AccountAlreadyActiveError();
        }

        await account.update({ status: AccountTypes.Status.ACTIVE });
    };

    getProfile = async (
        accountUuid: string,
    ) => {
        const account = await this.getAccount({
            uuid: accountUuid,
        });

        const {
            RecruiterProfile: recruiterProfile,
            RespondentProfile: respondentProfile,
        } = account;
        const profileData = (recruiterProfile || respondentProfile);

        const profile: any = {
            name: profileData.name,
            surname: profileData.surname,
            gender: profileData.gender,
            avatarUrl: profileData.avatarUrl,
            phoneNumber: profileData.phoneNumber,
            email: account.email,
            newsletter: account.newsletter,
        }

        if (recruiterProfile) {
            const company = await recruiterProfile.getCompany();

            profile.companyName = company.name;
            profile.sector = recruiterProfile.sector;
        } else if (respondentProfile) {
            profile.bankAccountNumber = respondentProfile.bankAccountNumber;
            profile.createdFromFile = respondentProfile.createdFromFile;
            profile.birthYear = respondentProfile.birthYear;
            profile.province = respondentProfile.province;
            profile.city = respondentProfile.city;
            profile.zipCode = respondentProfile.zipCode;
            profile.street = respondentProfile.street;
            profile.profession = respondentProfile.profession;
            profile.specialization = respondentProfile.specialization;
            profile.martialStatus = respondentProfile.martialStatus;
            profile.hasChildren = respondentProfile.hasChildren;
            profile.childrenCount = respondentProfile.childrenCount;
            profile.score = respondentProfile.score;
            if (respondentProfile.hasUploadedCV) {
                profile.cvUrl = this.s3Adapter.getPresignedS3Url(
                    this.cvBucketName,
                    getCVBucketKeyByEmail(account.email)
                );
            }
            if (respondentProfile.hasUploadedOtherFiles) {
                profile.otherFilesUrl = this.s3Adapter.getPresignedS3Url(
                    this.otherFilesBucketName,
                    getOtherFilesBucketKeyByEmail(account.email)
                );
            }
        }

        return profile;
    }

    updateProfile = async (
        accountUuid: string,
        profileData: any,
    ) => {
        const account = await this.getAccount({ uuid: accountUuid});

        if (account.type === AccountTypes.Type.RECRUITER) {
            const { RecruiterProfile: profile } = account;

            profile.name = profileData.name;
            profile.surname = profileData.surname;
            profile.gender = profileData.gender;
            profile.phoneNumber = profileData.phoneNumber;
            account.newsletter = profileData.newsletter;
        
            profile.sector = profileData.sector;

            if (profile.changed()) {
                await profile.save();
            }
            if (account.changed()) {
                await account.save();
            }
            //TODO profile.nationality
        } else {
            const { RespondentProfile: profile } = account;

            profile.name = profileData.name;
            profile.surname = profileData.surname;
            profile.gender = profileData.gender;
            profile.phoneNumber = profileData.phoneNumber;
            account.newsletter = profileData.newsletter;

            profile.bankAccountNumber = profileData.bankAccountNumber;
            if (profileData.birthYear) {
                profile.birthYear = profileData.birthYear;
            }
            profile.province = profileData.province;
            profile.city = profileData.city;
            profile.zipCode = profileData.zipCode;
            profile.street = profileData.street;
            profile.profession = profileData.profession;
            profile.specialization = profileData.specialization;
            profile.martialStatus = profileData.martialStatus;
            profile.hasChildren = profileData.hasChildren;
            profile.childrenCount = profileData.childrenCount;
            console.log(profile.changed(), account.changed())
            if (profile.changed()) {
                await profile.save();
            }
            if (account.changed()) {
                await account.save();
            }
            //TODO profile.nationality
        }
    }

    setPassword = async (
        uuid: string,
        password: string,
    ) => {
        const account = await this.getAccount({ uuid });

        if (account.passwordHash) {
            throw new AccountAlreadyHasPasswordError();
        }

        await account.update({ passwordHash: hash(password) });
    }

    changePassword = async (
        uuid: string,
        oldPassword: string,
        newPassword: string,
    ) => {
        const account = await this.getAccount({ uuid });

        if (account.passwordHash !== hash(oldPassword)) {
            throw new IncorrectPasswordError();
        }

        await account.update({ passwordHash: hash(newPassword) });
    }

    requestPasswordReset = async (
        uuid: string,
    ) => {
        const account = await this.getAccount({ uuid });

        const request = await ResetRequestModel.create({
            uuid: generateUuidV4(),
            accountId: account.id,
        });

        await this.mailService.send(
            account.email,
            'Password reset confirmation',
            `To reset password click: ${request.uuid}`
        );
    }

    confirmPasswordReset = SequelizeConnection.transaction(async (
        uuid: string,
        requestResetId: string,
    ) => {
        const account = await AccountModel.findOne({
            where: {
                uuid,
            },
            include: {
                model: ResetRequestModel,
                where: {
                    uuid: requestResetId,
                },
            },
        });

        if (!account) {
            throw new AccountNotFoundError();
        }

        const resetRequest = await ResetRequestModel.findOne({
            where: {
                uuid: requestResetId,
                accountId: account.id,
            },
        });

        if (!resetRequest) {
            throw new AccountHasNotRequestedPasswordResetError();
        }

        const resetRequestTime = moment(resetRequest.updatedAt);
        const requestExpiryTime = moment().subtract(15, 'minutes');
        if (resetRequestTime < requestExpiryTime) {
            throw new PasswordResetExpired();
        }

        const newPassword = 'TODOgenerateTHisPassword';
        await account.update({
            passwordHash: hash(newPassword),
        });
        await resetRequest.destroy();
        
        console.log("newPass", newPassword)
        await this.mailService.send(
            account.email,
            'New password',
            `Your new password: ${newPassword}`
        );
    });

    confirmCVUpload = async (
        currentUserUuid: string,
    ) => {
        const currentAccount = await this.getAccount({ uuid: currentUserUuid });
        const { RespondentProfile: currentProfile } = currentAccount;

        currentProfile.hasUploadedCV = true;
        if (currentProfile.changed()) {
            await currentProfile.save();
        }
    }

    getCVUploadUrl = async (
        currentUserUuid: string,
    ) => {
        const currentAccount = await this.getAccount({ uuid: currentUserUuid });

        const fileBucketKey = getCVBucketKeyByEmail(currentAccount.email);

        return await this.s3Adapter.getPResignedS3UploadUrl(
            this.cvBucketName,
            fileBucketKey,
        );
    }
    
    confirmOtherFilesUpload = async (
        currentUserUuid: string,
    ) => {
        const currentAccount = await this.getAccount({ uuid: currentUserUuid });
        const { RespondentProfile: currentProfile } = currentAccount;

        currentProfile.hasUploadedOtherFiles = true;
        if (currentProfile.changed()) {
            await currentProfile.save();
        }
    }

    getOtherFilesUploadUrl = async (
        currentUserUuid: string,
    ) => {
        const currentAccount = await this.getAccount({ uuid: currentUserUuid });

        const fileBucketKey = getOtherFilesBucketKeyByEmail(currentAccount.email);

        return await this.s3Adapter.getPResignedS3UploadUrl(
            this.otherFilesBucketName,
            fileBucketKey,
        );
    }

    addInterviewRecording = async (message: string) => {
        const {
            filename,
            userEmail,
        } = JSON.parse(message);

        const account = await this.getAccount({
            email: userEmail,
        });

        account.RespondentProfile.hasInterviewVideo = true;

        if (account.RespondentProfile.changed()) {
            await account.RespondentProfile.save();
        }

        this.mqAdapter.send(this.interviewsToTranscribeQueue, message);
    }

    addInterviewTranscript = async (accountEmail: string) => {
        const account = await this.getAccount({
            email: accountEmail,
        });

        const score = await this.gptAdapter.evaluateInterviewGrammar(accountEmail);
        
        account.RespondentProfile.hasInterviewTranscript = true;
        account.RespondentProfile.score = score;

        if (account.RespondentProfile.changed()) {
            await account.RespondentProfile.save();
        }
    }
}