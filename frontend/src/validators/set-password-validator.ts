import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';
import i18next from 'i18next';

import validateParams from './validate-params';

const { t } = i18next;


export default class SetPasswordValidator {
    static validateData = async (setPasswordData) => {
        const schemas = ValidationSchemas.instance();

        const setPasswordSchema = object({
            password: schemas.accountPassword,
        });

        const errors: any = await validateParams(
            setPasswordSchema,
            setPasswordData,
        );

        if (setPasswordData.password !== setPasswordData.repeatPassword) {
            errors.repeatPassword = t('validation.join.repeatPasswordError');
        }

        if (Object.keys(errors).length > 0) {
            throw errors;
        }          
    }
}