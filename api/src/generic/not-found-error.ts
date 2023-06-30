import { StatusCodes } from 'http-status-codes';

export default class NotFoundError extends Error {
    statusCode: StatusCodes;
    
    constructor() {
        super('Not found.');

        this.statusCode = StatusCodes.NOT_FOUND;
    }
}