import jwt, { JwtPayload } from 'jsonwebtoken';
import { Resolver, Mutation, Ctx } from 'type-graphql';
import IContext from '../../../apollo/IContext';
import { User } from '../../../entities/User';
import { createAccessToken, createRefreshToken, setRefreshTokenHeader } from '../../../utils/jwt-auth';
import { RefreshAccessTokenResponse } from '../type';

@Resolver(User)
export default class RefreshAccessTokenMutationResolver {
    @Mutation(() => RefreshAccessTokenResponse, { nullable: true })
    async refreshAccessToken(
        @Ctx()
        { req, res, redis }: IContext,
    ): Promise<RefreshAccessTokenResponse | null> {
        const refreshToken = req.cookies.refreshtoken;
        if (!refreshToken) return null;

        let tokenData: JwtPayload = null;
        try {
            tokenData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY) as JwtPayload;
        } catch (e) {
            console.error(e);
            return null;
        }
        const { userId } = tokenData;

        const storedRefreshToken = await redis.get(userId);
        const user = await User.findOne({ where: { id: userId } });

        if (storedRefreshToken === refreshToken && user) {
            const newAccessToken = createAccessToken(user);
            const newRefreshToken = createRefreshToken(user);

            await redis.set(String(user.id), newRefreshToken);

            setRefreshTokenHeader(res, newRefreshToken);

            return { accessToken: newAccessToken };
        }
        return null;
    }
}
