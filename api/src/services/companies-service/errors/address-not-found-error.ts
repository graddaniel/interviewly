import { StatusCodes } from 'http-status-codes';

export default class AddressNotFound extends Error {
    statusCode: StatusCodes;

    constructor() {
        super('Address not found.');

        this.statusCode = StatusCodes.NOT_FOUND;
    }
};