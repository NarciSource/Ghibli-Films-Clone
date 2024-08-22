import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { AuthenticationError } from 'apollo-server-core';
import { IncomingHttpHeaders } from 'http';
import { User } from '../entities/User';

export interface JwtVerifiedUser {
    userId: User['id'];
}

export function createAccessToken(user: User): string {
    const userData: JwtVerifiedUser = { userId: user.id };
    const accessToken = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });

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

export const createRefreshToken = (user: User): string => {
    const userData: JwtVerifiedUser = { userId: user.id };
    const refreshToken = jwt.sign(userData, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '14d' });

    return refreshToken;
};

export function setRefreshTokenHeader(res: Response, refreshToken: string): void {
    res.cookie('refreshtoken', refreshToken, {
        httpOnly: true, // 클라이언트 js에서 접근을 막음
        secure: process.env.NODE_ENV === 'production', // https에서만 동작
        sameSite: 'lax',
        // strict: 같은 도메인만 가능
        // lax: 느슨하게, anchor, link 태그 또는 302 리다이렉트로 이동했을 때 가능
        // none: cross-site도 가능
    });
}
