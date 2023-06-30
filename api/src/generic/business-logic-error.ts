import { StatusCodes } from 'http-status-codes';

export default class BussinessLogicError extends Error {
    statusCode: StatusCodes;

    constructor(message: string) {
        super(message);

        this.statusCode = StatusCodes.CONFLICT;
    }
}