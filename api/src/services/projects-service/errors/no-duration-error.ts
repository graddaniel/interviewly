import { StatusCodes } from 'http-status-codes';

import BussinessLogicError from '../../../generic/business-logic-error';


export default class NoDurationError extends BussinessLogicError {
    statusCode: StatusCodes;

    constructor() {
        super('Project lacks Meeting Duration definition');
    }
}