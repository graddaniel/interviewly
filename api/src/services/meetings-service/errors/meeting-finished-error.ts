import { StatusCodes } from 'http-status-codes';

import BussinessLogicError from '../../../generic/business-logic-error';


export default class MeetingFinishedError extends BussinessLogicError {
    statusCode: StatusCodes;

    constructor() {
        super('Meeting has already finished.');
    }
}