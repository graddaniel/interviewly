import { StatusCodes } from 'http-status-codes';

export default class AuthorizationError extends Error {
    statusCode: StatusCodes;

    constructor(message: string) {
        super(message);

        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}