import { StatusCodes } from 'http-status-codes';

import BussinessLogicError from '../../../generic/business-logic-error';


export default class IncompleteProjectDraftError extends BussinessLogicError {
    statusCode: StatusCodes;

    constructor() {
        super('Incomplete project draft');
    }
}