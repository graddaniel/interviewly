import { StatusCodes } from 'http-status-codes';

import BussinessLogicError from '../../../generic/business-logic-error';


export default class ProjectNoLongerEditableError extends BussinessLogicError {
    statusCode: StatusCodes;

    constructor() {
        super('Project is no longer editable.');
    }
}