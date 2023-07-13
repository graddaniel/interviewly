import BussinessLogicError from '../../../generic/business-logic-error';

export default class RecruiterAccountMissingCompanyNameError extends BussinessLogicError {
    constructor() {
        super('Company name is missing. Recruiter account must specify a company.');
    }
}