import { AuthenticationError } from 'apollo-server-core';
import { MiddlewareFn } from 'type-graphql';
import { JwtVerifiedUser } from '../utils/jwt-auth';

export const isAuthenticated: MiddlewareFn<{ verifiedUser: JwtVerifiedUser }> = async ({ context }, next) => {
    if (!context.verifiedUser) throw new AuthenticationError('unauthenticated');

    return next();
};
