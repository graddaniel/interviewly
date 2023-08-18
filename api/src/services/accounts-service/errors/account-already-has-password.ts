import BussinessLogicError from '../../../generic/business-logic-error';

export default class AccountAlreadyHasPasswordError extends BussinessLogicError {
    constructor() {
        super('Account already has a password.');
    }
}