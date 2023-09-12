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

    static async validateRecruiterProfileData(
        profileData: any,
    ) {
        const newPasswordSchema = object({
            name: schemas.accountName,
            surname: schemas.accountSurname,
            gender: schemas.gender,
            phoneNumber: schemas.accountPhoneNumber,
            newsletter: schemas.accountNewsletter,
            sector: schemas.recruiterProfile.sector,
        });

        await validate(newPasswordSchema, profileData);
    }

    static async validateRespondentProfileData(
        profileData: any,
    ) {
        const newPasswordSchema = object({
            name: schemas.accountName,
            surname: schemas.accountSurname,
            gender: schemas.gender,
            phoneNumber: schemas.accountPhoneNumber,
            newsletter: schemas.accountNewsletter,
            bankAccountNumber: schemas.respondentProfile.bankAccountNumber,
            birthYear: schemas.respondentProfile.birthYear,
            province: schemas.respondentProfile.province,
            city: schemas.respondentProfile.city,
            zipCode: schemas.respondentProfile.zipCode,
            street: schemas.respondentProfile.street,
            profession: schemas.respondentProfile.profession,
            specialization: schemas.respondentProfile.specialization,
            martialStatus: schemas.respondentProfile.martialStatus,
            hasChildren: schemas.respondentProfile.hasChildren,
            childrenCount: schemas.respondentProfile.childrenCount,
        });

        await validate(newPasswordSchema, profileData);
    }
}