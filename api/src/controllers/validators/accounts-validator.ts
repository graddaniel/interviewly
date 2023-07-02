import {
    object,
    string,
    ValidationError as YupValidationError,
} from 'yup';
import config from 'config';

import ValidationError from './validation-error';
import configJson from '../../../config/default.json';

type ValidationConfiguration = typeof configJson.validation;

const validationConfig = config.get('validation') as ValidationConfiguration;

const newAccountSchema = object({
    email: string()
        .email()
        .required(),
    password: string()
        .required()
        .min(validationConfig.password.minLength)
        .max(validationConfig.password.maxLength)
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
        //TODO move the regexp to JSON, but make sure it's correctly escaped
    name: string()
        .required()
        .min(validationConfig.name.minLength)
        .max(validationConfig.name.maxLength),
    surname: string()
        .required()
        .min(validationConfig.surname.minLength)
        .max(validationConfig.surname.maxLength),
    role: string()
        .required()
        .oneOf(['recruiter', 'respondent']),
    gender: string()
        .required()
        .oneOf(['male', 'female']),
});

export default class AccountsValidator {
    static async validateNewAccount(newAccount) {
        try {
            return await newAccountSchema.validate(newAccount);
        } catch (error) {
            //TODO log original error
            console.log("VALIDATION", error)
            throw new ValidationError(
                (error as YupValidationError).errors[0]
            );
        }
    }
}