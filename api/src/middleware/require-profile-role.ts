import NotPermittedError from './errors/not-permitted-error';

import type { NextFunction, Response } from 'express';
import type { ProfileTypes } from 'shared';

import type { AuthenticatedRequest } from '../generic/types';

const requireProfileRole = (role: ProfileTypes.Role) => (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) => {
    const {
        role: currentUserRole,
    } = req.currentUser;

    if (currentUserRole !== role) {
        throw new NotPermittedError();
    }

    next();
};

export default requireProfileRole;