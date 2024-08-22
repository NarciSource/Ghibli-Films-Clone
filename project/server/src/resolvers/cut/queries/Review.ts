import { Args, Ctx, Query, Resolver } from 'type-graphql';
import { Not } from 'typeorm';
import { CutReview } from '../../../entities/CutReview';
import { PaginationArgs } from '../type';
import IContext from '../../../apollo/IContext';

@Resolver(CutReview)
export default class CutReviewQueryResolver {
    @Query(() => [CutReview])
    async cutReviews(@Args() { skip, cutId }: PaginationArgs, @Ctx() { verifiedUser }: IContext): Promise<CutReview[]> {
        let reviewHistory: CutReview | undefined;
        let realTake = 2;

        if (verifiedUser?.userId) {
            reviewHistory = await CutReview.findOne({
                where: { cutId, user: { id: verifiedUser.userId } },
            });

            realTake = 1;
        }

        const reviews = await CutReview.find({
            where: reviewHistory
                ? {
                      cutId,
                      id: Not(reviewHistory.id),
                  }
                : { cutId },
            skip,
            take: realTake,
            order: { createdAt: 'DESC' },
        });

        if (reviewHistory) {
            return [reviewHistory, ...reviews];
        }
        return reviews;
    }
}
