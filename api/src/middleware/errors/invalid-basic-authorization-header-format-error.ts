import { StatusCodes } from 'http-status-codes';

export default class InvalidBasicAuthorizationHeaderFormatError extends Error {
    statusCode: StatusCodes;
    
    constructor() {
        super(`Invalid basic authorization header format.`);

        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}