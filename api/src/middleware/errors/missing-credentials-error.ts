import AuthorizationError from '../../generic/authorization-error';


export default class MissingCredentialsError extends AuthorizationError {   
    constructor() {
        super('Missing credentials');
    }
}