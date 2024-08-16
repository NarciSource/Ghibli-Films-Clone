import { Resolver, Mutation, Ctx } from 'type-graphql';
import IContext from '../../../apollo/IContext';
import { User } from '../../../entities/User';
import { setRefreshTokenHeader } from '../../../utils/jwt-auth';

@Resolver(User)
export default class LogoutMutationResolver {
    @Mutation(() => Boolean)
    async logout(
        @Ctx()
        { verifiedUser, res, redis }: IContext,
    ): Promise<boolean> {
        if (verifiedUser) {
            setRefreshTokenHeader(res, '');

            await redis.del(String(verifiedUser.userId));
        }
        return true;
    }
}
