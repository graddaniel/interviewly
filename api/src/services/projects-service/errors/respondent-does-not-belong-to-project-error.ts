import { StatusCodes } from 'http-status-codes';

import BussinessLogicError from '../../../generic/business-logic-error';


export default class RespondentDoesNotBelongToProjectError extends BussinessLogicError {
    statusCode: StatusCodes;

    constructor() {
        super('Respondent does not belong to the project.');
    }
}