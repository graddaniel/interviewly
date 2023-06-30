import MissingAuthorizationHeaderError from './errors/missing-authorization-header-error.js';
import InvalidAuthorizationTypeError from './errors/invalid-authorization-type-error.js';
import MissingTokenError from './errors/missing-token-error.js';
import JWTService from '../services/jwt-service/jwt-service.js';

import type {
    Response,
    NextFunction,
} from 'express';
import type {
    AuthenticatedRequest,
} from '../generic/types.js'

export function requireJWT(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new MissingAuthorizationHeaderError();
    }

    const [
        authorizationType,
        jwtToken
    ] = authorization.split(" ");
    if (authorizationType.toLowerCase() !== 'bearer') {
        throw new InvalidAuthorizationTypeError(
            authorizationType.toLowerCase(),
            'bearer',
        );
    }
    if (!jwtToken) {
        throw new MissingTokenError();
    }

    const tokenPayload = JWTService.verify(jwtToken);

    req.currentUser = tokenPayload;

    next();
}