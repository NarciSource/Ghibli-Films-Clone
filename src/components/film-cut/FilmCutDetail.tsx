import { AspectRatio, Box, Button, Flex, Heading, HStack, Image } from '@chakra-ui/react';
import { CutQuery } from '../../generated/graphql';
import { FaHeart } from 'react-icons/fa';

export default function FilmCutDetail({ cut }: { cut: CutQuery['cut'] }): React.ReactElement {
    return (
        <Box>
            <AspectRatio ratio={16 / 9}>
                <Image src={cut?.src} objectFit="cover" />
            </AspectRatio>

            <Box py={4}>
                <Flex justify="space-between" alignItems="center">
                    <Heading size="sm">{cut?.id}번째 사진</Heading>
                    <HStack spacing={1} alignItems="center">
                        <Button aria-label="like-this-cut-button" leftIcon={<FaHeart />} />
                        <Button colorScheme="teal">감상 남기기</Button>
                    </HStack>
                </Flex>
            </Box>
        </Box>
    );
}
