import { Resolver, FieldResolver, Root, Int, Ctx } from 'type-graphql';
import ghibliData from '../../../data/ghibli';
import IContext from '../../../apollo/IContext';
import { Cut } from '../../../entities/Cut';
import { CutVote } from '../../../entities/CutVote';
import { Film } from '../../../entities/Film';

@Resolver(Cut)
export default class CutFieldResolver {
    @FieldResolver(() => Film, { nullable: true })
    film(@Root() cut: Cut): Film | undefined {
        return ghibliData.films.find((film) => film.id === cut.filmId);
    }

    @FieldResolver(() => Int)
    async votesCount(@Root() cut: Cut): Promise<number> {
        const count = await CutVote.count({ where: { cutId: cut.id } });
        return count;
    }

    @FieldResolver(() => Boolean)
    async isVoted(@Root() cut: Cut, @Ctx() { verifiedUser }: IContext): Promise<boolean> {
        if (verifiedUser) {
            const votes = await CutVote.find({ where: { cutId: cut.id } });
            const isUserVoted = votes.some((vote) => vote.userId === verifiedUser.userId);

            if (isUserVoted) {
                return true;
            }
        }
        return false;
    }
}
