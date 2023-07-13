import type {
    Schema,
} from 'yup';
import { ValidationSchemas } from 'shared';


const SCHEMAS = ValidationSchemas.instance();

const validateParams = async (
    schema: Schema,
    data: any,
) => {
    console.log("data", data, schema)
    const errors: any = {};

    try {
        await schema.validate(data, { abortEarly: false });

    } catch (error) {
        const validationErrors = error.inner;
        for (const validationError of validationErrors) {
            const {
                path,
                errors: errorMessages,
            } = validationError;
            const errorMessage = errorMessages[0];

            const errorCode = parseInt(errorMessage);
            errors[path] = isNaN(errorCode)
                ? errorMessage
                : SCHEMAS.decodeError(errorMessage);
        }

        console.log(JSON.stringify(error), errors)
    }

    return errors;
};

export default validateParams;