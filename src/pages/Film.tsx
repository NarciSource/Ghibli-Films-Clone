import { useParams } from 'react-router-dom';
import CommonLayout from '../components/CommonLayout';
import { useFilmQuery } from '../generated/graphql';
import { Box, Spinner, Text } from '@chakra-ui/react';
import FilmDetail from '../components/film/FilmDetail';

export default function Film(): React.ReactElement {
    const { filmId } = useParams<{ filmId: string }>();
    const { data, loading, error } = useFilmQuery({
        variables: { filmId: Number(filmId) },
    });

    return (
        <CommonLayout>
            {loading && <Spinner />}
            {error && <Text>페이지를 표시할 수 없습니다.</Text>}

            <Box>
                <FilmDetail />
            </Box>
        </CommonLayout>
    );
}
