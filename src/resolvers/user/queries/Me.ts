import { Resolver, UseMiddleware, Query, Ctx } from 'type-graphql';
import IContext from '../../../apollo/IContext';
import { User } from '../../../entities/User';
import { isAuthenticated } from '../../../middlewares/isAuthenticated';

@Resolver(User)
export default class MeQueryResolver {
    @UseMiddleware(isAuthenticated)
    @Query(() => User, { nullable: true })
    async me(
        @Ctx()
        context: IContext,
    ): Promise<User | undefined> {
        return User.findOne({ where: { id: context.verifiedUser.userId } });
    }
}
