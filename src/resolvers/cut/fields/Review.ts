import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { User } from '../../../entities/User';
import { CutReview } from '../../../entities/CutReview';
import IContext from '../../../apollo/IContext';

@Resolver(CutReview)
export default class ReviewFieldResolver {
    @FieldResolver(() => User)
    async user(@Root() cutReview: CutReview): Promise<User> {
        return (await User.findOne({ where: { id: cutReview.userId } }))!;
    }

    @FieldResolver(() => Boolean)
    async isMine(
        @Root()
        cutReview: CutReview,
        @Ctx()
        { verifiedUser }: IContext,
    ): Promise<boolean> {
        if (!verifiedUser) {
            return false;
        }
        return cutReview.userId === verifiedUser?.userId;
    }
}
