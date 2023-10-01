import { StatusCodes } from 'http-status-codes';

export default class UnexpectedError extends Error {
    statusCode: StatusCodes;

    constructor(message: string) {
        super(`Unexpected error. Error: ${message}`);

        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}