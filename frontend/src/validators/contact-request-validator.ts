import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';

import validateParams from './validate-params';


export default class ContactRequestValidator {
    static validateNewRequest = async (newRequestData) => {
        const SCHEMAS = ValidationSchemas.instance();

        const contactRequestSchema = object({
            email: SCHEMAS.email,
            message: SCHEMAS.contactRequestMessage,
        });

        const errors: any = await validateParams(
            contactRequestSchema,
            newRequestData
        );

        if (Object.keys(errors).length > 0) {
            throw errors;
        }        
    }
}