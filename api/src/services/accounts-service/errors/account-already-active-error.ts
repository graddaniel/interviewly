import BussinessLogicError from '../../../generic/business-logic-error';

export default class AccountAlreadyActiveError extends BussinessLogicError {
    constructor() {
        super('Account is already confirmed.');
    }
}