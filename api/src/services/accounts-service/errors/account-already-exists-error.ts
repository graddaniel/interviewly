import BussinessLogicError from '../../../generic/business-logic-error';

export default class AccountAlreadyExistsError extends BussinessLogicError {
    constructor(
        email: string
    ) {
        super(`Account with email: ${email} already exists.`);
    }
}