import { IsEmail, IsString } from 'class-validator'; // 입력 필드 유효성 검사
import { Field, InputType, ObjectType } from 'type-graphql';
import { User } from '../entities/User';
import { FieldError } from '../entities/FieldError';

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

@ObjectType({ description: '로그인 반환 데이터' })
export class LoginResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;

    @Field({ nullable: true })
    accessToken?: string;
}
