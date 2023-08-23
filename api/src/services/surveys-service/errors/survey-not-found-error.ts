import { StatusCodes } from 'http-status-codes';

export default class SurveyNotFoundError extends Error {
    statusCode: StatusCodes;

    constructor() {
        super('Survey not found');

        this.statusCode = StatusCodes.NOT_FOUND;
    }
}