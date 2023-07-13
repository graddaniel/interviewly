import BussinessLogicError from '../../../generic/business-logic-error';

export default class AccountHasNotRequestedPasswordResetError extends BussinessLogicError {   
    constructor() {
        super('Account has not request password reset.');
    }
}