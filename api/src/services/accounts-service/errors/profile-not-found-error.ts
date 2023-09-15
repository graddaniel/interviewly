import NotFoundError from '../../../generic/not-found-error';


export default class ProfileNotFoundError extends NotFoundError {  
    constructor() {
        super('Profile not found.');
    }
}