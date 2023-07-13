import { StatusCodes } from 'http-status-codes';

export default class CompanyNotFound extends Error {
    statusCode: StatusCodes;

    constructor() {
        super('Company not found.');

        this.statusCode = StatusCodes.NOT_FOUND;
    }
};