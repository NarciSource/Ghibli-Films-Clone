import { Box, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { useFilmsQuery } from '../../generated/graphql';
import FilmCard from './FilmCard';
import { Waypoint } from 'react-waypoint';

export default function FilmList(): JSX.Element {
    const LIMIT = 6;
    const { data, loading, error, fetchMore } = useFilmsQuery({
        variables: { limit: LIMIT, cursor: 1 },
    });

    if (error) return <p>{error.message}</p>;

    return (
        <SimpleGrid columns={[2, null, 3]} spacing={[2, null, 10]}>
            {loading && new Array(6).fill(0).map((x, i) => <Skeleton key={i} height="400px" />)}
            {!loading &&
                data &&
                data.films.films.map((film, i) => (
                    <Box key={film.id}>
                        {data.films.cursor && i === data.films.films.length - LIMIT / 2 && (
                            /* 4번째 데이터에서 Waypoint 엮임 */
                            <Waypoint
                                onEnter={() => {
                                    fetchMore({
                                        variables: { limit: LIMIT, cursor: data.films.cursor },
                                    });
                                }}
                            />
                        )}
                        <FilmCard film={film} />
                    </Box>
                ))}
        </SimpleGrid>
    );
}
