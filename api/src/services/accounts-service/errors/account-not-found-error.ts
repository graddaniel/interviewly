import NotFoundError from '../../../generic/not-found-error';


export default class AccountNotFoundError extends NotFoundError {   
    constructor() {
        super('Account not found.');
    }
}