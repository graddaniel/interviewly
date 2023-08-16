import { StatusCodes } from 'http-status-codes';

export default class NotPermittedError extends Error {
    statusCode: StatusCodes;

    constructor (message?: string) {
        super(message || 'Operation not permitted');

        this.statusCode = StatusCodes.FORBIDDEN;
    }
};