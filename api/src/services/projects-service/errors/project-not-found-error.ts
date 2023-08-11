import { StatusCodes } from 'http-status-codes';

export default class ProjectNotFoundError extends Error {
    statusCode: StatusCodes;

    constructor() {
        super('Project not found');

        this.statusCode = StatusCodes.NOT_FOUND;
    }
}