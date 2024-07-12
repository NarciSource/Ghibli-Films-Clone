import { Box, Flex, Heading, Image, Tag, Text } from '@chakra-ui/react';

export default function FilmDetail() {
    return (
        <Flex>
            <Box>
                <Image />
            </Box>

            <Flex>
                <Flex>
                    <Tag>genre</Tag>
                </Flex>
                <Heading>title release</Heading>
                <Heading>subtitle</Heading>
                <Text>director runningTime</Text>
                <Text>description</Text>
            </Flex>
        </Flex>
    );
}
