import type { Request as ExpressRequest } from 'express';

export type AuthenticationRequest = {
    credentials: {
        email: string,
        password: string,
    }
} & ExpressRequest;

export type JWTUserInfo = {
    uuid: string,
    email: string
}

export type AuthenticatedRequest = {
    currentUser: JWTUserInfo;
} & ExpressRequest;