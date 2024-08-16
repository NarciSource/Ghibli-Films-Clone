import argon2 from 'argon2';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import IContext from '../../../apollo/IContext';
import { User } from '../../../entities/User';
import { createAccessToken, createRefreshToken, setRefreshTokenHeader } from '../../../utils/jwt-auth';
import { LoginResponse, LoginInput } from '../type';

@Resolver(User)
export default class LoginMutationResolver {
    @Mutation(() => LoginResponse)
    async login(
        @Arg('loginInput')
        { emailOrUsername, password }: LoginInput,
        @Ctx()
        { res, redis }: IContext,
    ): Promise<typeof LoginResponse> {
        // 유저 확인
        const user = await User.findOne({
            where: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });
        const isValid = user && (await argon2.verify(user?.password, password));

        let response: typeof LoginResponse;
        if (isValid) {
            // JWT 토큰 발급
            const accessToken = createAccessToken(user);
            const refreshToken = createRefreshToken(user);

            // 리프레시 토큰 레디스 적재
            await redis.set(String(user.id), refreshToken);
            // 쿠키로 리프레시 토큰 전송
            setRefreshTokenHeader(res, refreshToken);

            response = { user, accessToken };
        } else if (user) {
            response = { field: 'password', message: '비밀번호가 틀렸습니다.' };
        } else {
            response = { field: 'emailOrUsername', message: '해당하는 유저가 없습니다.' };
        }
        return response;
    }
}
