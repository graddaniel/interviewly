import ValidationError from '../../../controllers/validators/validation-error';
import BussinessLogicError from '../../../generic/business-logic-error';

export default class CompanyAlreadyExistsError extends ValidationError {
    constructor(
        name: string
    ) {
        super('companyName', `Company "${name}" already exists.`);
    }
}