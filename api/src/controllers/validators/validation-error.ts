import { StatusCodes } from 'http-status-codes';

export default class ValidationError extends Error {
    statusCode: StatusCodes;

    constructor(message: string) {
        super(message);

        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}