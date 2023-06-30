import BussinessLogicError from '../../../generic/business-logic-error';

export default class AccountAlreadyConfirmed extends BussinessLogicError {
    constructor() {
        super('Account is already confirmed.');
    }
}