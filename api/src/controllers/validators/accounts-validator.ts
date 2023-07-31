import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';

import validate from './validate';


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

    static async validateCompanyAccount(companyAccount) {
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
}