import {
    string,
} from 'yup';

// 8 chars, one capital, one digit, one symbol
const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const SCHEMAS = {
    nameSchema: string().required().min(2).max(32), // TODO add name and surname regexps
    surnameSchema: string().required().min(2).max(32),
    emailSchema: string().email().required(),
    passwordSchema: string().required().matches(PASSWORD_REGEXP),
};

const REGEXP_CONSTRAINTS = {
    password: 'password must contain at least 8 characters - small, capital, digits, special',
};

export default class Validator {
    static _validateParams = async (params, data) => {
        console.log("data", data)
        const errors: any = {};

        for (const param of params) {
            try {
                await SCHEMAS[`${param}Schema`].validate(data[param]);
            } catch (error) {
                let processedError = error.message.replace('this', param);
                processedError = processedError.includes('match') && REGEXP_CONSTRAINTS[param]
                    ? REGEXP_CONSTRAINTS[param]
                    : processedError;
                errors[param] = processedError;
            }
        }

        return errors;
    }

    static validateJoinData = async (joinData) => {
        const errors: any = await Validator._validateParams(
            ['name', 'surname', 'email', 'password'],
            joinData
        );

        if (joinData.password !== joinData.repeatPassword) {
            errors.repeatPassword = 'passwords must match';
        }

        if (Object.keys(errors).length > 0) {
            throw errors;
        }        
    }

    static validateLogInData = async (logInData) => {
        console.log("logInData", logInData)
        const errors: any = await Validator._validateParams(
            ['email', 'password'],
            logInData
        );

        if (Object.keys(errors).length > 0) {
            throw errors;
        }     
    }
}