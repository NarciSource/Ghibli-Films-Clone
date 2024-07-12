import { Query, Resolver, FieldResolver, Root, Int, Arg } from 'type-graphql';
import ghibliData from '../data/ghibli';
import { Film } from '../entities/Film';
import { Director } from '../entities/Director';
import { PaginatedFilms } from '../entities/PaginatedFilm';

@Resolver(Film) // 인자: 오브젝트타입
export class FilmResolver {
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

    @FieldResolver(() => Director)
    director(@Root() parentFilm: Film): Director | undefined {
        return ghibliData.directors.find((director) => director.id === parentFilm.director_id);
    }
}

// --SDL--
// type Query {
//     films: {
//         cursor: Int
//         films: [Film]
//     }
// }
