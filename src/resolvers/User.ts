import argon2 from 'argon2';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { SignUpInput, LoginInput, LoginResponse } from './User.type';
import { User } from '../entities/User';
import { createAccessToken, createRefreshToken, setRefreshTokenHeader } from '../utils/jwt-auth';
import { isAuthenticated } from '../middlewares/isAuthenticated';

@Resolver(User)
export class UserResolver {
    @UseMiddleware(isAuthenticated)
    @Query(() => User, { nullable: true })
    async me(
        @Ctx()
        context,
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
        { res },
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

// --SDL--
// union LoginResponse = UserWithToken | FieldError

// type Mutation {
//     user: {
//         signup(signUpInput: SignUpInput!): User

//         login(loginInput: LoginInput!): LoginResponse
//     }
// }
