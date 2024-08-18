import { FieldResolver, Resolver, Root } from 'type-graphql';
import { User } from '../../../entities/User';
import { CutReview } from '../../../entities/CutReview';

@Resolver(CutReview)
export default class ReviewFieldResolver {
    @FieldResolver(() => User)
    async user(@Root() cutReview: CutReview): Promise<User> {
        return (await User.findOne({ where: { id: cutReview.userId } }))!;
    }
}
