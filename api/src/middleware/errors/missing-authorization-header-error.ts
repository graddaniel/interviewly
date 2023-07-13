import AuthorizationError from '../../generic/authorization-error';


export default class MissingAuthorizationHeaderError extends AuthorizationError {
    constructor() {
        super('Missing authorization header');
    }
}