import { IsEmail, IsString } from 'class-validator'; // 입력 필드 유효성 검사
import { Field, InputType, ObjectType, createUnionType } from 'type-graphql';
import { FieldError } from '../../entities/User.Error';
import { UserWithToken } from '../../entities/User.withToken';

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
    types: () => [UserWithToken, FieldError] as const,
    resolveType: (value) => {
        if ('user' in value) {
            return UserWithToken;
        }
        if ('message' in value) {
            return FieldError;
        }
        return undefined;
    },
});

@ObjectType({ description: '엑세스 토큰 반환 데이터' })
export class RefreshAccessTokenResponse {
    @Field()
    accessToken: string;
}
