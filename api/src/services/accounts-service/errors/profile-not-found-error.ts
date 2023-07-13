import { StatusCodes } from 'http-status-codes';

export default class ProfileNotFoundError extends Error {
    statusCode: StatusCodes;
    
    constructor() {
        super('Profile not found.');

        this.statusCode = StatusCodes.NOT_FOUND;
    }
}