import { AspectRatio, Box, Button, Flex, Heading, HStack, Image } from '@chakra-ui/react';
import { CutQuery } from '../../generated/graphql';

export default function FilmCutDetail({ cut }: { cut: CutQuery['cut'] }): React.ReactElement {
    return (
        <Box>
            <AspectRatio>
                <Image src={cut?.src} />
            </AspectRatio>

            <Box>
                <Flex>
                    <Heading>{cut?.id}번째 사진</Heading>
                    <HStack>
                        <Button>Fa-Heart</Button>
                        <Button>감상 남기기</Button>
                    </HStack>
                </Flex>
            </Box>
        </Box>
    );
}
