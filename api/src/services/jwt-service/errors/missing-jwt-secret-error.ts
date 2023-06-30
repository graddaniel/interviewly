import { StatusCodes } from 'http-status-codes';

export default class MissingJWTSecretError extends Error {
    statusCode: StatusCodes;
    
    constructor() {
        super(`JWT Secret is missing.`);

        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}