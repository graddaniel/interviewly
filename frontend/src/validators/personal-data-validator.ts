import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';
import i18next from 'i18next';

import validateParams from './validate-params';

const { t } = i18next;


export default class PersonalDataValidator {
    static validatePasswordChange = async (
        passwordChangeData,
    ) => {
        const schemas = ValidationSchemas.instance();

        const passwordChangeSchema = object({
            currentPassword: schemas.accountPassword,
            newPassword: schemas.accountPassword,
        });

        const errors: any = await validateParams(
            passwordChangeSchema,
            passwordChangeData,
        );

        if (passwordChangeData.newPassword !== passwordChangeData.repeatPassword) {
            errors.repeatPassword = t('validation.changePassword.repeatPasswordError');
        }

        if (passwordChangeData.currentPassword === passwordChangeData.newPassword) {
            errors.newPassword = t('validation.changePassword.newPasswordSameAsOld');
        }

        if (Object.keys(errors).length > 0) {
            throw errors;
        }          
    }

    static validateRecruiterPersonalDataUpdate = async (personalData) => {
        const schemas = ValidationSchemas.instance();

        const personalDataSchema = object({
            name: schemas.accountName,
            surname: schemas.accountSurname,
            gender: schemas.gender,
            phoneNumber: schemas.accountPhoneNumber,
            newsletter: schemas.accountNewsletter,
            sector: schemas.recruiterProfile.sector,
        });

        const errors: any = await validateParams(
            personalDataSchema,
            personalData,
        );

        if (Object.keys(errors).length > 0) {
            throw errors;
        } 
    }

    static validateRespondentPersonalDataUpdate = async (personalData) => {
        const schemas = ValidationSchemas.instance();

        const personalDataSchema = object({
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

        const errors: any = await validateParams(
            personalDataSchema,
            personalData,
        );

        if (Object.keys(errors).length > 0) {
            throw errors;
        } 
    }
}