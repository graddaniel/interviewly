import { v4 as generateUuidV4 } from 'uuid';
import moment from 'moment';
import config from 'config';
import { AccountTypes, ProfileTypes } from 'shared';

import AccountModel from '../../models/account';
import RecruiterProfileModel from '../../models/recruiter-profile';
import RespondentProfileModel from '../../models/respondent-profile';
import ResetRequestModel from '../../models/password-reset-request';
import AccountAlreadyExistsError from './errors/account-already-exists-error';
import AccountNotFoundError from './errors/account-not-found-error';
import IncorrectPasswordError from './errors/incorrect-password-error';
import JWTService from '../jwt-service/jwt-service';
import { hash } from '../../utils'
import AccountHasNotRequestedPasswordResetError from './errors/account-has-not-requested-password-reset-error';
import SequelizeConnection from '../sequelize-connection';

import type MailService from '../mail-service/mail-service';
import PasswordResetExpired from './errors/password-reset-expired-error';
import AccountAlreadyActive from './errors/account-already-active-error';
import CompanyModel from '../../models/company';


export default class AccountsService {
    private mailService: MailService;
    private additionalNotificationsTarget: string;

    constructor(
        mailService: MailService,
    ) {
        this.mailService = mailService;

        this.additionalNotificationsTarget = config.get('registration.additionalNotificationsTarget');
    }

    login = async (
        email: string,
        password: string
    ): Promise<string> => {
        const account = await AccountModel.findOne({
            where: {
                email,
            },
            include: [{
                association: AccountModel.associations.RecruiterProfile,
            }, {
                association: AccountModel.associations.RespondentProfile,
            }]
        });

        if (!account) {
            throw new AccountNotFoundError();
        }

        const providedPasswordHash = hash(password);
        if (providedPasswordHash !== account.passwordHash) {
            throw new IncorrectPasswordError();
        }

        return JWTService.sign({
            uuid: account.uuid,
            email: account.email,
        });
    };

    register = SequelizeConnection.transaction(async (
        email: string,
        password: string,
        type: AccountTypes.Type,
        name: string,
        surname: string,
        gender: ProfileTypes.Gender,
        notify?: boolean,
    ): Promise<string> => {
        const account = await AccountModel.findOne({
            where: {
                email,
            }
        });

        if (account) {
            throw new AccountAlreadyExistsError(email);
        }

        //check if company already has an account
        let companyId;
        if (!companyId) {
            const newCompany = await CompanyModel.create({});

            companyId = newCompany.id;
        }

        const newAccount = await AccountModel.create({
            uuid: generateUuidV4(),
            email,
            passwordHash: hash(password),
            type,
            status: AccountTypes.Status.UNCONFIRMED,
            [type === AccountTypes.Type.RECRUITER ? 'RecruiterProfile' : 'RespondentProfile']: {
                name,
                surname,
                gender,
                role: ProfileTypes.Role.Admin,
                CompanyId: companyId,
            }
        }, {
            include: [{
                association: type === AccountTypes.Type.RECRUITER
                    ? AccountModel.associations.RecruiterProfileModel
                    : AccountModel.associations.RespondentProfileModel,
            }]
        });

        // if (type === AccountTypes.Type.RECRUITER) {
        //     await RecruiterProfileModel.create({
        //         account_id: newAccount.id,
        //         name,
        //         surname,
        //         gender,
        //         role: ProfileTypes.Role.Admin,
        //     });
        // } else {
        //     await RespondentProfileModel.create({
        //         account_id: newAccount.id,
        //         name,
        //         surname,
        //         gender,
        //     });
        // }

        await this.mailService.send(
            newAccount.email,
            'Confirm account',
            `To confirm account click: ${newAccount.uuid}`
        );

        if (notify) {
            await this.mailService.send(
                this.additionalNotificationsTarget,
                'New account',
                `New account has been created: ${newAccount.email} ${newAccount.type}`
            );
        }

        return JWTService.sign({
            uuid: newAccount.uuid,
            email: newAccount.email
        });
    });

    confirmAccountRegistration = async (
        uuid: string,
    ) => {
        const account = await AccountModel.findOne({
            where: {
                uuid,
            }
        });

        if (!account) {
            throw new AccountNotFoundError();
        }

        if (account.status === AccountTypes.Status.ACTIVE) {
            throw new AccountAlreadyActive();
        }

        await account.update({ status: AccountTypes.Status.ACTIVE });
    };

    requestPasswordReset = async (
        uuid: string,
    ) => {
        const account = await AccountModel.findOne({
            where: {
                uuid,
            }
        });

        if (!account) {
            throw new AccountNotFoundError();
        }

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