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
import { hash } from '../../utils'
import AccountHasNotRequestedPasswordResetError from './errors/account-has-not-requested-password-reset-error';
import SequelizeConnection from '../sequelize-connection';
import CompanyModel from '../../models/company';
import PasswordResetExpired from './errors/password-reset-expired-error';
import AccountAlreadyActiveError from './errors/account-already-active-error';
import RecruiterAccountMissingCompanyNameError from './errors/recruiter-account-missing-company-name-error';
import RecruiterAccountMissingCompanyDataError from './errors/recruiter-account-missing-company-data-error';

import type MailService from '../mail-service/mail-service';
import type CompaniesService from '../companies-service/companies-service';
import IncorrectAccountType from './errors/incorrect-account-type';
import ProfileNotFoundError from './errors/profile-not-found-error';
import NotPermittedError from '../../generic/not-permitted-error';
import AccountAlreadyHasPasswordError from './errors/account-already-has-password';


export default class AccountsService {
    private mailService: MailService;
    private companiesService: CompaniesService;
    private additionalNotificationsTarget: string;

    constructor(
        mailService: MailService,
        companiesService: CompaniesService
    ) {
        this.mailService = mailService;

        this.companiesService = companiesService;

        this.additionalNotificationsTarget = config.get('registration.additionalNotificationsTarget');
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
                role: ProfileTypes.Role.Admin,
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
        email: string,
        name: string,
        surname: string,
        gender: ProfileTypes.Gender,
        role: ProfileTypes.Role = ProfileTypes.Role.Admin,
        status: AccountTypes.Status = AccountTypes.Status.UNCONFIRMED,
    ) => {
        if (role === ProfileTypes.Role.InterviewlyStaff
            && currentUserRole !== ProfileTypes.Role.InterviewlyStaff) {
            throw new NotPermittedError();
        }

        const account = await this.getAccount({ uuid });
        if (account.type !== AccountTypes.Type.RECRUITER) {
            throw new IncorrectAccountType(account.type);
        }

        const recruiterProfile = await RecruiterProfileModel.findOne({ where: { account_id: account.id }});
        if (!recruiterProfile) {
            throw new ProfileNotFoundError();
        }

        await account.update({
            email,
            status,
        });
        await recruiterProfile.update({
            name,
            surname,
            gender,
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
}