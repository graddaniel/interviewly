import BussinessLogicError from '../../../generic/business-logic-error';

export default class AccountAlreadyActive extends BussinessLogicError {
    constructor() {
        super('Account is already confirmed.');
    }
}