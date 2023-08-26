import NotPermittedError from '../generic/not-permitted-error';

import type { NextFunction, Response } from 'express';
import type { ProfileTypes } from 'shared';

import type { AuthenticatedRequest } from '../generic/types';

const requireProfileRoles = (role: ProfileTypes.Role | ProfileTypes.Role[]) => (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) => {
    const {
        role: currentUserRole,
    } = req.currentUser;

    if (Array.isArray(role) && !role.includes(currentUserRole)) {
        throw new NotPermittedError();
    } else if (!Array.isArray(role) && role !== currentUserRole) {
        throw new NotPermittedError();
    }

    next();
};

export default requireProfileRoles;