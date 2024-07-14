import argon2 from 'argon2';
import { InputType, Arg, Field, Mutation, Resolver, ObjectType } from 'type-graphql';
import { IsEmail, IsString } from 'class-validator'; // 입력 필드 유효성 검사
import { User } from '../entities/User';

@InputType()
export class SignUpInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    username: string;

    @Field()
    @IsString()
    password: string;
}

@InputType()
export class LoginInput {
    @Field()
    @IsString()
    emailOrUsername: string;

    @Field()
    @IsString()
    password: string;
}

@ObjectType({ description: '필드 에러 타입' })
export class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType({ description: '로그인 반환 데이터' })
export class LoginResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;

    @Field({ nullable: true })
    accessToken?: string;
}

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
