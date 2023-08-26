import { StatusCodes } from 'http-status-codes';

import BussinessLogicError from '../../../generic/business-logic-error';


export default class MeetingNotReadyError extends BussinessLogicError {
    statusCode: StatusCodes;

    constructor() {
        super('Meeting is not yet ready.');
    }
}