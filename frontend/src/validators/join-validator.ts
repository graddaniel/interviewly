import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';

import validateParams from './validate-params';


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
            errors.repeatPassword = 'passwords must match';
        }

        if (Object.keys(errors).length > 0) {
            throw errors;
        }        
    }
}