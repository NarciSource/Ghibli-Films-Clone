import { Box, Flex, Heading, Image, Tag, Text } from '@chakra-ui/react';
import { FilmQuery } from '../../generated/graphql';

interface FilmDetailProps {
    film?: FilmQuery['film'];
}

export default function FilmDetail({ film }: FilmDetailProps): React.ReactElement {
    return (
        <Flex>
            <Box>
                <Image src={film?.posterImg} />
            </Box>

            <Flex>
                <Flex>
                    <Tag>{film?.genre}</Tag>
                </Flex>
                <Heading>
                    {film?.title} {film?.release}
                </Heading>
                <Heading>{film?.subtitle}</Heading>
                <Text>
                    {film?.director.name} {film?.runningTime}
                </Text>
                <Text>{film?.description}</Text>
            </Flex>
        </Flex>
    );
}
