import AuthorizationError from '../../generic/authorization-error';


export default class InvalidAuthorizationTypeError extends AuthorizationError {   
    constructor(
        receivedType: string,
        expectedType: string,
    ) {
        super(`Invalid authorization type. Received: ${receivedType}, expected: ${expectedType}`);
    }
}