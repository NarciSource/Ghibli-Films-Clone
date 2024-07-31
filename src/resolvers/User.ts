import argon2 from 'argon2';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { SignUpInput, LoginInput, LoginResponse, RefreshAccessTokenResponse } from './User.type';
import { User } from '../entities/User';
import { createAccessToken, createRefreshToken, setRefreshTokenHeader } from '../utils/jwt-auth';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import IContext from '../apollo/IContext';

@Resolver(User)
export class UserResolver {
    @UseMiddleware(isAuthenticated)
    @Query(() => User, { nullable: true })
    async me(
        @Ctx()
        context: IContext,
    ): Promise<User | undefined> {
        return User.findOne({ where: { id: context.verifiedUser.userId } });
    }

    @Mutation(() => User)
    async signUp(
        @Arg('signUpInput')
        signUpInput: SignUpInput,
    ): Promise<User> {
        const { email, password, username } = signUpInput;
        const hashedPassword = await argon2.hash(password);

        const newUser = User.create({
            email,
            password: hashedPassword,
            username,
        });

        await newUser.save();
        return newUser;
    }

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

// --SDL--
// union LoginResponse = UserWithToken | FieldError

// type Mutation {
//     user: {
//         signup(signUpInput: SignUpInput!): User

//         login(loginInput: LoginInput!): LoginResponse
//     }
// }
