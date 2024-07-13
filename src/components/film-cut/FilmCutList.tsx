import { Box, Image, LinkBox, LinkOverlay, SimpleGrid, Spinner, useDisclosure } from '@chakra-ui/react';
import { useCutsQuery } from '../../generated/graphql';
import LazyLoad from 'react-lazyload';
import FilmCutModal from './FilmCutModal';

interface FilmCutListProps {
    filmId: number;
}

export default function FilmCutList({ filmId }: FilmCutListProps): React.ReactElement {
    const { data, loading } = useCutsQuery({ variables: { filmId } });
    const { isOpen, onOpen, onClose } = useDisclosure();

    return loading ? (
        <Box>
            <Spinner />
        </Box>
    ) : (
        <>
            <SimpleGrid my={4} columns={[1, 2, null, 3]} spacing={[2, null, 8]}>
                {data?.cuts.map((cut) => (
                    <LazyLoad once key={cut.id} height="200px">
                        <LinkBox>
                            <Box>
                                <LinkOverlay onClick={() => onOpen()}>
                                    <Image src={cut.src} />
                                </LinkOverlay>
                            </Box>
                        </LinkBox>
                    </LazyLoad>
                ))}
            </SimpleGrid>
            {isOpen && <FilmCutModal open={isOpen} onClose={onClose} />}
        </>
    );
}
