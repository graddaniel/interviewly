import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';
import i18next from 'i18next';

import validateParams from './validate-params';

const { t } = i18next;

export default class JoinValidator {
    static validateData = async (joinData) => {
        const schemas = ValidationSchemas.instance();

        const joinDataSchema = object({
            name: schemas.accountName,
            surname: schemas.accountSurname,
            email: schemas.email,
            password: schemas.accountPassword,
            companyName: schemas.company.name,
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