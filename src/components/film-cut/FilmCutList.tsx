import { Box, Image, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useCutsQuery } from '../../generated/graphql';

interface FilmCutListProps {
    filmId: number;
}

export default function FilmCutList({ filmId }: FilmCutListProps): React.ReactElement {
    const { data, loading } = useCutsQuery({ variables: { filmId } });

    return loading ? (
        <Box>
            <Spinner />
        </Box>
    ) : (
        <SimpleGrid my={4} columns={[1, 2, null, 3]} spacing={[2, null, 8]}>
            {data?.cuts.map((cut) => <Image src={cut.src} key={cut.id} />)}
        </SimpleGrid>
    );
}
