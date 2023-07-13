import AuthorizationError from '../../generic/authorization-error';


export default class MissingTokenError extends AuthorizationError {
    constructor() {
        super('Missing token');
    }
}