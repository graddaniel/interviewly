import BussinessLogicError from '../../../generic/business-logic-error';


export default class RecruiterAccountMissingCompanyDataError extends BussinessLogicError {
    constructor(
        email: string,
    ) {
        super(`Account "${email}" is missing company information`);
    }
}