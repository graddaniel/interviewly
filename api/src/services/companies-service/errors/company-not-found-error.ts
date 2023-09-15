import NotFoundError from '../../../generic/not-found-error';


export default class CompanyNotFound extends NotFoundError {
    constructor() {
        super('Company not found.');
    }
};