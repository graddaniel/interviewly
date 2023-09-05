import { StatusCodes } from 'http-status-codes';

import BussinessLogicError from '../../../generic/business-logic-error';


export default class IncorrectProjectStatusError extends BussinessLogicError {
    statusCode: StatusCodes;

    constructor() {
        super('Incorrect project status error.');
    }
}