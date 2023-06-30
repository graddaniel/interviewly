import { StatusCodes } from 'http-status-codes';

export default class AccountNotFoundError extends Error {
    statusCode: StatusCodes;
    
    constructor() {
        super('Account not found.');

        this.statusCode = StatusCodes.NOT_FOUND;
    }
}