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
}