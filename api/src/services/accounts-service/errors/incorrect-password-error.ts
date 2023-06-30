import { StatusCodes } from 'http-status-codes';

export default class IncorrectPasswordError extends Error {
    statusCode: StatusCodes;
    
    constructor() {
        super('Incorrect password');

        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}