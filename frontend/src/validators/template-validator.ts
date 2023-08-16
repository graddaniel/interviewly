import {
    object,
} from 'yup';
import { ProjectTypes, ValidationSchemas, Errors } from 'shared';

import validateParams from './validate-params';


export default class TemplateValidator {
    static validateTemplate = async (
        templateData: any
    ) => {
        const templateSchema = object({
        });

        const errors: any = await validateParams(
            templateSchema,
            templateData,
        );

        if (Object.keys(errors).length > 0) {
            throw errors;
        }          
    }
}