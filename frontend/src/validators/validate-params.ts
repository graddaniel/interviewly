import type {
    Schema,
} from 'yup';
import { t } from 'i18next';

const validateParams = async (
    schema: Schema,
    data: any,
) => {
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
                : t(`errors.${errorMessage}`);
        }

        console.log(JSON.stringify(error), errors)
    }

    return errors;
};

export default validateParams;