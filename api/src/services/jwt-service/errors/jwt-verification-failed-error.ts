import { StatusCodes } from 'http-status-codes';

export default class JWTVerificationFailedError extends Error {
    statusCode: StatusCodes;

    constructor(message: string) {
        super(`JWT verification failed. details: ${message}`);

        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}