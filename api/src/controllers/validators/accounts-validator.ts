import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';

import validate from './validate';
import ValidationError from './validation-error';


const schemas = ValidationSchemas.instance();

export default class AccountsValidator {
    static async validateNewAccount(newAccount) {
        const newAccountSchema = object({
            email: schemas.email,
            password: schemas.accountPassword,
            name: schemas.accountName,
            surname: schemas.accountSurname,
            type: schemas.accountType,
            gender: schemas.gender,
            companyName: schemas.company.name,
        });

        await validate(newAccountSchema, newAccount);
    }

    static async validateNewCompanyAccount(companyAccount) {
        const companyAccountSchema = object({
            name: schemas.accountName,
            surname: schemas.accountSurname,
            email: schemas.email,
            gender: schemas.gender,
            role: schemas.accountRole,
            status: schemas.accountStatus,
        });

        await validate(companyAccountSchema, companyAccount);
    }

    static async validateEditedCompanyAccount(companyAccount) {
        const companyAccountSchema = object({
            role: schemas.accountRole,
            status: schemas.accountStatus,
        });

        await validate(companyAccountSchema, companyAccount);
    }

    static async validateNewPassword(
        newPassword: string,
    ) {
        const newPasswordSchema = object({
            password: schemas.accountPassword,
        });

        await validate(newPasswordSchema, {
            password: newPassword,
        });
    }

    static async validatePasswordChange(
        newPassword: string,
        oldPassword: string,
    ) {
        const newPasswordSchema = object({
            newPassword: schemas.accountPassword,
            oldPassword: schemas.accountPassword,
        });

        await validate(newPasswordSchema, {
            newPassword,
            oldPassword,
        });

        if (oldPassword === newPassword) {
            throw new ValidationError(
                'newPassword',
                'New password is the same as old one'
            );
        }
    }
}