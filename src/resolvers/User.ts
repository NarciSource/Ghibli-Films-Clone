import argon2 from 'argon2';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { SignUpInput, LoginInput, LoginResponse } from './User.type';
import { User } from '../entities/User';

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
        { emailOrUsername, password }: LoginInput,
    ): Promise<typeof LoginResponse> {
        // 유저 확인
        const user = await User.findOne({
            where: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });
        const isValid = await argon2.verify(user?.password, password);

        let response: typeof LoginResponse;
        if (isValid) {
            response = user;
        } else if (user) {
            response = { field: 'password', message: '비밀번호가 틀렸습니다.' };
        } else {
            response = { field: 'emailOrUsername', message: '해당하는 유저가 없습니다.' };
        }
        return response;
    }
}

// --SDL--
// union LoginResponse = User | FieldError

// type Mutation {
//     user: {
//         signup(signUpInput: SignUpInput!): User

//         login(loginInput: LoginInput!): LoginResponse
//     }
// }
