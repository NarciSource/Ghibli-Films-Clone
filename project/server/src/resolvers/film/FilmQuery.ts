import { Resolver, Query, Arg, Int } from 'type-graphql';
import ghibliData from '../../data/ghibli';
import { Film } from '../../entities/Film';
import { PaginatedFilms } from '../../entities/PaginatedFilm';

@Resolver(Film) // 인자: 오브젝트타입
export default class FilmQueryResolver {
    // 영화 리스트
    @Query(() => PaginatedFilms)
    films(
        @Arg('limit', () => Int, { nullable: true, defaultValue: 6 })
        limit?: number,
        @Arg('cursor', () => Int, { nullable: true, defaultValue: 1 })
        cursor?: Film['id'],
    ): PaginatedFilms {
        const cursorDataIndex = ghibliData.films.findIndex((f) => f.id === cursor);

        if (cursorDataIndex !== -1) {
            const result = ghibliData.films.slice(cursorDataIndex, cursorDataIndex + limit);
            const nextCursor = result[result.length - 1].id + 1;

            return {
                films: result,
                cursor: nextCursor,
            };
        }
        return { films: [] };
    }

    // 영화 상세
    @Query(() => Film, { nullable: true })
    film(
        @Arg('filmId', () => Int)
        filmId: number,
    ): Film | undefined {
        return ghibliData.films.find((x) => x.id === filmId);
    }
}
