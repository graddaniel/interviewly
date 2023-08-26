import { StatusCodes } from 'http-status-codes';

export default class MeetingNotFoundError extends Error {
    statusCode: StatusCodes;

    constructor() {
        super('Meeting not found');

        this.statusCode = StatusCodes.NOT_FOUND;
    }
}