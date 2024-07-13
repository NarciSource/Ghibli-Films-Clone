import { AspectRatio, Box, Button, Flex, Heading, HStack, Image } from '@chakra-ui/react';

export default function FilmCutDetail(): React.ReactElement {
    return (
        <Box>
            <AspectRatio>
                <Image />
            </AspectRatio>

            <Box>
                <Flex>
                    <Heading>{}번째 사진</Heading>
                    <HStack>
                        <Button>Fa-Heart</Button>
                        <Button>감상 남기기</Button>
                    </HStack>
                </Flex>
            </Box>
        </Box>
    );
}
