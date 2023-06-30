import { v4 as generateUuidV4 } from 'uuid';
import moment from 'moment';

import AccountModel from '../../models/account';
import ResetRequestModel from '../../models/reset-request';
import AccountAlreadyExistsError from './errors/account-already-exists-error';
import AccountNotFoundError from './errors/account-not-found-error';
import IncorrectPasswordError from './errors/incorrect-password-error';
import JWTService from '../jwt-service/jwt-service';
import { hash } from '../../utils'
import AccountHasNotRequestedPasswordResetError from './errors/account-has-not-requested-password-reset-error';
import SequelizeConnection from '../sequelize-connection';

import type MailService from '../mail-service/mail-service';
import PasswordResetExpired from './errors/password-reset-expired-error';
import AccountAlreadyConfirmed from './errors/account-already-confirmed-error';


export default class AccountsService {
    private mailService: MailService;

    constructor(
        mailService: MailService,
    ) {
        this.mailService = mailService;
    }

    login = async (
        email: string,
        password: string
    ): Promise<string> => {
        const account = await AccountModel.findOne({
            where: {
                email,
            }
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

    register = async (
        email: string,
        password: string,
        name: string,
        surname: string,
    ): Promise<string> => {
        const account = await AccountModel.findOne({
            where: {
                email,
            }
        });

        if (account) {
            throw new AccountAlreadyExistsError(email);
        }

        const newAccount = await AccountModel.create({
            uuid: generateUuidV4(),
            email,
            passwordHash: hash(password),
            name,
            surname,
            confirmed: false,
        });

        console.log("accId", newAccount.uuid);
        await this.mailService.send(
            newAccount.email,
            'Confirm account',
            `To confirm account click: ${newAccount.uuid}`
        );

        return JWTService.sign({
            uuid: newAccount.uuid,
            email: newAccount.email
        });
    };

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

        if (account.confirmed) {
            throw new AccountAlreadyConfirmed();
        }

        await account.update({ confirmed: true });
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

        console.log("reqId", request.uuid)
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