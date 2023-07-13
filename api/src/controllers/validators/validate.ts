import {
    ValidationError as YupValidationError,
} from 'yup';

import ValidationError from './validation-error';


export default async function validate(schema, data) {
    try {
        return await schema.validate(data);
    } catch (error) {
        //TODO log original error
        console.log("VALIDATION", error, error.constructor);

        throw new ValidationError(
            error.path,
            (error as YupValidationError).errors[0]
        );
    }
}