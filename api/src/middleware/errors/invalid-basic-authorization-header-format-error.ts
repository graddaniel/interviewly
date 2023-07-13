import AuthorizationError from '../../generic/authorization-error';


export default class InvalidBasicAuthorizationHeaderFormatError extends AuthorizationError {   
    constructor() {
        super(`Invalid basic authorization header format.`);
    }
}