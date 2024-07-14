import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

export default function createAccessToken(user: User): string {
    const userData = { userId: user.id };
    const accessToken = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });

    return accessToken;
}
