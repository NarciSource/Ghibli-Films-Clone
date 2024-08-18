import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

import { CutReview } from '../../../entities/CutReview';
import { isAuthenticated } from '../../../middlewares/isAuthenticated';
import IContext from '../../../apollo/IContext';
import { CreateOrUpdateReviewInput } from '../type';

@Resolver(CutReview)
export default class ReviewMutationResolver {
    @Mutation(() => CutReview, { nullable: true })
    @UseMiddleware(isAuthenticated)
    async createOrUpdateReview(
        @Arg('cutReviewInput') cutReviewInput: CreateOrUpdateReviewInput,
        @Ctx() { verifiedUser }: IContext,
    ) {
        const { cutId, contents } = cutReviewInput;
        const { userId } = verifiedUser;

        if (!verifiedUser) {
            return null;
        }

        // 이전 감상평 조회
        const prevCutReview = await CutReview.findOne({
            where: { cutId, user: { id: userId } },
            relations: ['user'],
        });

        if (prevCutReview) {
            // 이미 작성한 감상평이 있으면 수정
            prevCutReview.contents = contents;
            await prevCutReview.save();
            return prevCutReview;
        }

        // 감상평 생성
        const cutReview = CutReview.create({
            contents,
            cutId,
            user: { id: userId },
        });
        await cutReview.save();
        return cutReview;
    }
}
