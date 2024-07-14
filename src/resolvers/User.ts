import argon2 from 'argon2';
import { InputType, Arg, Field, Mutation, Resolver } from 'type-graphql';
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
}
