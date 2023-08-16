import { StatusCodes } from 'http-status-codes';

export default class NotFoundError extends Error {
    statusCode: StatusCodes;
    
    constructor(message?: string) {
        super(message || 'Not found.');

        this.statusCode = StatusCodes.NOT_FOUND;
    }
}