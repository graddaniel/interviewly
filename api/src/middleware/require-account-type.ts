import NotPermittedError from '../generic/not-permitted-error';

import type { NextFunction, Response } from 'express';
import type { AccountTypes } from 'shared';

import type { AuthenticatedRequest } from '../generic/types';

const requireAccountType = (type: AccountTypes.Type) => (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) => {
    const {
        type: curentUserType,
    } = req.currentUser;

    if (curentUserType !== type) {
        throw new NotPermittedError();
    }

    next();
};

export default requireAccountType;
