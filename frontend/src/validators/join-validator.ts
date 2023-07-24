import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';
import i18next from 'i18next';

import validateParams from './validate-params';

const { t } = i18next;
const SCHEMAS = ValidationSchemas.instance();

export default class JoinValidator {
    static validateData = async (joinData) => {
        const joinDataSchema = object({
            name: SCHEMAS.accountName,
            surname: SCHEMAS.accountSurname,
            email: SCHEMAS.email,
            password: SCHEMAS.accountPassword,
            companyName: SCHEMAS.companyName,
        });

        const errors: any = await validateParams(
            joinDataSchema,
            joinData
        );

        if (joinData.password !== joinData.repeatPassword) {
            errors.repeatPassword = t('validation.join.repeatPasswordError');
        }

        if (!joinData.agreement) {
            errors.agreement = 'Required';
        }

        if (Object.keys(errors).length > 0) {
            throw errors;
        }        
    }
}