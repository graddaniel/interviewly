import { StatusCodes } from 'http-status-codes';
import { Errors } from "shared";
import { t } from 'i18next';


export default class ValidationError extends Error {
    path: string;
    statusCode: StatusCodes;
    errorCode: Errors.ErrorCodes;

    constructor(
        path: string,
        errorMessage: string,
    ) {
        //check if error message is the error code
        const errorCode = parseInt(errorMessage, 10);

        if (isNaN(errorCode)) {
            super(errorMessage);
            this.errorCode = Errors.ErrorCodes.Unknown;
        } else {
            super(t(`errors.${errorMessage}`));
            this.errorCode = errorCode;
        }

        this.path = path;
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}