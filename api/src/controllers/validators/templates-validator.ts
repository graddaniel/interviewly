import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';

import validate from './validate';


const schemas = ValidationSchemas.instance();

export default class TemplatesValidator {
    static validateNewTemplate = async (requestData) => {
        const newTemplateSchema = object({
        });

        await validate(newTemplateSchema, requestData);
    }
}