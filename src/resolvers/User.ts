import argon2 from 'argon2';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../entities/User';
import { SignUpInput, LoginInput, LoginResponse } from './User.type';

@Resolver(User)
export default class UserResolver {
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
        loginInput: LoginInput,
    ): Promise<LoginResponse> {
        const { emailOrUsername, password } = loginInput;

        const user = await User.findOne({
            where: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });
        const isValid = await argon2.verify(user?.password, password);

        let response: LoginResponse;
        if (isValid) {
            response = { user };
        } else if (user) {
            response = { errors: [{ field: 'password', message: '비밀번호가 틀렸습니다.' }] };
        } else {
            response = { errors: [{ field: 'emailOrUsername', message: '해당하는 유저가 없습니다.' }] };
        }
        return response;
    }
}

// --SDL--
// type Mutation {
//     user: {
//         signup(signUpInput: SignUpInput!): {
//             email: String
//             username: String
//             createdAt: String
//             updatedAt: String
//             id: Int
//         }
//         login(loginInput: LoginInput!): {
//             errors: [FieldError]
//             user: User
//             accessToken: String
//         }
//     }
// }
