import { StatusCodes } from 'http-status-codes';

import BussinessLogicError from '../../../generic/business-logic-error';

export default class AccountHasNotRequestedPasswordResetError extends BussinessLogicError {
    statusCode: StatusCodes;
    
    constructor() {
        super('Account has not request password reset.');
    }
}