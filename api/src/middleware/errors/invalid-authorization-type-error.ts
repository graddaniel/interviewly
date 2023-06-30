import { StatusCodes } from 'http-status-codes';

export default class InvalidAuthorizationTypeError extends Error {
    statusCode: StatusCodes;
    
    constructor(
        receivedType: string,
        expectedType: string,
    ) {
        super(`Invalid authorization type. Received: ${receivedType}, expected: ${expectedType}`);

        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}