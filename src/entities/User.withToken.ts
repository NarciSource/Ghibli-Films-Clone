import { Field, ObjectType } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class UserWithToken {
    @Field(() => User)
    user: User;

    @Field()
    accessToken: string;
}
