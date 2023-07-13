import BussinessLogicError from '../../../generic/business-logic-error';

export default class CompanyAlreadyExistsError extends BussinessLogicError {
    constructor(
        name: string
    ) {
        super(`Company "${name}" already exists.`);
    }
}