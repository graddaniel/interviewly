import { StatusCodes } from 'http-status-codes';

export default class MissingAuthorizationHeaderError extends Error {
    statusCode: StatusCodes;

    constructor() {
        super('Missing authorization header');

        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}