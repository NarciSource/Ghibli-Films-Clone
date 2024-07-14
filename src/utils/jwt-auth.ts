import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-core';
import { IncomingHttpHeaders } from 'http';
import { User } from '../entities/User';

interface JwtVerifiedUser {
    userId: User['id'];
}

export function createAccessToken(user: User): string {
    const userData: JwtVerifiedUser = { userId: user.id };
    const accessToken = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });

    return accessToken;
}

export function verifyAccessToken(accessToken?: string): JwtVerifiedUser | null {
    if (accessToken) {
        try {
            const verified = jwt.verify(accessToken, process.env.JWT_SECRET_KEY) as JwtVerifiedUser;
            return verified;
        } catch (err) {
            console.error('access_token expired', err.expiredAt);
            throw new AuthenticationError('access token expired');
        }
    } else {
        return null;
    }
}

export function verifyAccessTokenFromReqHeaders({ authorization }: IncomingHttpHeaders): JwtVerifiedUser | null {
    try {
        const accessToken = authorization.replace('Bearer ', '');
        return verifyAccessToken(accessToken);
    } catch {
        return null;
    }
}
