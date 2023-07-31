import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';

import validateParams from './validate-params';


export default class LogInValidator {
    static validateData = async (logInData) => {
        const SCHEMAS = ValidationSchemas.instance();

        const loginDataSchema = object({
            email: SCHEMAS.email,
            password: SCHEMAS.accountPassword,
        });

        const errors: any = await validateParams(
            loginDataSchema,
            logInData,
        );

        if (Object.keys(errors).length > 0) {
            throw errors;
        }          
    }
}