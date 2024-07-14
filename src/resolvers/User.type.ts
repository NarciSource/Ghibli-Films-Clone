import { IsEmail, IsString } from 'class-validator'; // 입력 필드 유효성 검사
import { Field, InputType, createUnionType } from 'type-graphql';
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

export const LoginResponse = createUnionType({
    name: 'LoginResponse',
    description: '로그인 반환 데이터',
    types: () => [User, FieldError] as const,
    resolveType: (value) => {
        if (value instanceof User) {
            return User;
        }
        if ('message' in value) {
            return FieldError;
        }
        return undefined;
    },
});
