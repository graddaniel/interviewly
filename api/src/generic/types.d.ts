import type { Request as ExpressRequest } from 'express';
import type { AccountTypes, ProfileTypes } from 'shared';

export type AuthenticationRequest = {
    credentials: {
        email: string,
        password: string,
    }
} & ExpressRequest;

export type JWTUserInfo = {
    uuid: string,
    email: string
    type: AccountTypes.Type;
    companyUuid: string;
    role: ProfileTypes.Role;
}

export type AuthenticatedRequest = {
    currentUser: JWTUserInfo;
} & ExpressRequest;