import { StatusCodes } from 'http-status-codes';

export default class MissingCredentialsError extends Error {
    statusCode: StatusCodes;
    
    constructor() {
        super('Missing credentials');

        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}