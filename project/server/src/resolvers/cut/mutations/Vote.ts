import { Resolver, Mutation, UseMiddleware, Arg, Int, Ctx } from 'type-graphql';
import IContext from '../../../apollo/IContext';
import { Cut } from '../../../entities/Cut';
import { CutVote } from '../../../entities/CutVote';
import { isAuthenticated } from '../../../middlewares/isAuthenticated';

@Resolver(Cut)
export default class VoteMutationResolver {
    @Mutation(() => Boolean)
    @UseMiddleware(isAuthenticated)
    async vote(
        @Arg('cutId', () => Int)
        cutId: number,
        @Ctx()
        { verifiedUser }: IContext,
    ): Promise<boolean> {
        if (verifiedUser) {
            const { userId } = verifiedUser;
            const alreadyVoted = await CutVote.findOne({
                where: { cutId, userId },
            });

            if (alreadyVoted) {
                await alreadyVoted.remove();
            } else {
                const vote = CutVote.create({ cutId, userId });
                await vote.save();
            }
            return true;
        }
        return false;
    }
}
