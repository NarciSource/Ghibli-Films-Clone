import { Resolver, FieldResolver, Root } from 'type-graphql';
import ghibliData from '../../data/ghibli';
import { Director } from '../../entities/Director';
import { Film } from '../../entities/Film';

@Resolver(Film)
export default class FilmFieldResolver {
    // 영화 리스트 안의 감독정보
    @FieldResolver(() => Director)
    // @Root: 부모객체 참조
    director(@Root() parentFilm: Film): Director | undefined {
        return ghibliData.directors.find((director) => director.id === parentFilm.director_id);
    }
}
