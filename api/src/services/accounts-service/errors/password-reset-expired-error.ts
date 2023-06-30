import { StatusCodes } from 'http-status-codes';

import BussinessLogicError from '../../../generic/business-logic-error';

export default class PasswordResetExpired extends BussinessLogicError {
    statusCode: StatusCodes;
    
    constructor() {
        super('Password reset has expired.');
    }
}