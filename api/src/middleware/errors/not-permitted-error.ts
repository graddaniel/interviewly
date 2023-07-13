import { StatusCodes } from 'http-status-codes';

export default class NotPermittedError extends Error {
    statusCode: StatusCodes;

    constructor () {
        super('Operation not permitted');

        this.statusCode = StatusCodes.FORBIDDEN;
    }
};