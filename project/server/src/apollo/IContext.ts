import { Request, Response } from 'express';
import { JwtVerifiedUser } from '../utils/jwt-auth';
import redis from '../redis/redis-client';

export default interface IContext {
    req: Request;
    res: Response;
    verifiedUser: JwtVerifiedUser;
    redis: typeof redis;
}
