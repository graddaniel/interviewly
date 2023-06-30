import { StatusCodes } from 'http-status-codes';

export default class MissingTokenError extends Error {
    statusCode: StatusCodes;

    constructor() {
        super('Missing token');

        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}