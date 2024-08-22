import { useParams } from 'react-router-dom';
import CommonLayout from '../components/CommonLayout';
import { useFilmQuery } from '../generated/graphql';
import { Box, Spinner, Text } from '@chakra-ui/react';
import FilmDetail from '../components/film/FilmDetail';
import FilmCutList from '../components/film-cut/FilmCutList';

export default function Film(): React.ReactElement {
    const { filmId } = useParams<{ filmId: string }>();
    const { data, loading, error } = useFilmQuery({
        variables: { filmId: Number(filmId) },
    });

    return (
        <CommonLayout>
            {loading && <Spinner />}
            {error && <Text>페이지를 표시할 수 없습니다.</Text>}
            {filmId && data?.film ? (
                <>
                    <FilmDetail film={data.film} />
                    <Box mt={12}>
                        <FilmCutList filmId={data.film.id} />
                    </Box>
                </>
            ) : (
                <Text>페이지를 표시할 수 없습니다.</Text>
            )}
        </CommonLayout>
    );
}
