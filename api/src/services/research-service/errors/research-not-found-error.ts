import { StatusCodes } from 'http-status-codes';

export default class ResearchNotFoundError extends Error {
    statusCode: StatusCodes;

    constructor() {
        super('Research not found');

        this.statusCode = StatusCodes.NOT_FOUND;
    }
}