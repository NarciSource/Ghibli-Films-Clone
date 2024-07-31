import { AuthenticationError } from 'apollo-server-core';
import { Request } from 'express';
import { MiddlewareFn } from 'type-graphql';
import { JwtVerifiedUser, verifyAccessToken } from '../utils/jwt-auth';

export const isAuthenticated: MiddlewareFn<{ verifiedUser: JwtVerifiedUser; req: Request }> = async (
    { context },
    next,
) => {
    const { authorization } = context.req.headers;

    if (!authorization) throw new AuthenticationError('unauthenticated');
    const accessToken = authorization.replace('Bearer ', '');

    verifyAccessToken(accessToken);

    return next();
};
