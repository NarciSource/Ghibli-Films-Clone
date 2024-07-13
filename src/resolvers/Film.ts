import { Query, Resolver, FieldResolver, Root, Int, Arg } from 'type-graphql';
import ghibliData from '../data/ghibli';
import { Film } from '../entities/Film';
import { Director } from '../entities/Director';
import { PaginatedFilms } from '../entities/PaginatedFilm';

@Resolver(Film) // 인자: 오브젝트타입
export class FilmResolver {
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

    // 영화 리스트 안의 감독정보
    @FieldResolver(() => Director)
    // @Root: 부모객체 참조
    director(@Root() parentFilm: Film): Director | undefined {
        return ghibliData.directors.find((director) => director.id === parentFilm.director_id);
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

// --SDL--
// type Query {
//     films: {
//         cursor: Int
//         films: [Film]
//     }

//     film: {
//         ...Film,
//         Director
//     }
// }
