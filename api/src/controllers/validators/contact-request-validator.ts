import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';

import validate from './validate';


const schemas = ValidationSchemas.instance();

export default class ContactRequestValidator {
    static ValidateNewContactRequest = async (requestData) => {
        const newContactSchema = object({
            email: schemas.email,
            message: schemas.contactRequestMessage,
        });

        await validate(newContactSchema, requestData);
    }
}