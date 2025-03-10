import {
    AspectRatio,
    Box,
    LinkBox,
    Image,
    Stack,
    Heading,
    useColorModeValue,
    Text,
    LinkOverlay,
} from '@chakra-ui/react';
import { FilmsQuery } from '../../generated/graphql';
import { Link } from 'react-router-dom';

interface FilmCardProps {
    film: FilmsQuery['films']['films'][0];
}

export default function FilmCard({ film }: FilmCardProps): React.ReactElement {
    return (
        <LinkBox as="article" my={6}>
            <Box maxW="300px" w="full" rounded="md" px={{ base: 1, md: 3 }} pt={3} overflow="hidden">
                <Box bg="gray.100" mt={-3} mx={-3} mb={2} pos="relative">
                    <AspectRatio ratio={2 / 3}>
                        <Image src={film.posterImg} />
                    </AspectRatio>
                </Box>
                <Stack>
                    <LinkOverlay as={Link} to={`/film/${film.id}`}>
                        <Heading color={useColorModeValue('gray.700', 'white')} fontSize="xl" fontFamily="body">
                            {film.title}
                        </Heading>
                    </LinkOverlay>
                    <Text fontSize="sm" color="grey.500" isTruncated>
                        {film.subtitle ? film.subtitle : <>&nbsp;</>}
                    </Text>
                </Stack>
                <Stack spacing={0} fontSize="sm" mt={2}>
                    <Text as="time" dateTime={film.release} isTruncated color="gray.500">
                        {`${film.release} ${film.runningTime}분`}
                    </Text>
                    <Text isTruncated>{film.director.name}</Text>
                </Stack>
            </Box>
        </LinkBox>
    );
}
