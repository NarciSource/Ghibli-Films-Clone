import { AspectRatio, Box, Button, Flex, Heading, HStack, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { CutQuery, useVoteMutation } from '../../generated/graphql';
import { FaHeart } from 'react-icons/fa';

type FilmCutDetailProps = Exclude<CutQuery['cut'], null | undefined>;

export default function FilmCutDetail({
    id: cutId,
    src: cutImg,
    isVoted = false,
    votesCount = 0,
}: FilmCutDetailProps): React.ReactElement {
    const votedButtonColor = useColorModeValue('gray.500', 'gray.400');

    const [vote, { loading: voteLoading }] = useVoteMutation({ variables: { cutId } });

    return (
        <Box>
            <AspectRatio ratio={16 / 9}>
                <Image src={cutImg} objectFit="cover" />
            </AspectRatio>

            <Box py={4}>
                <Flex justify="space-between" alignItems="center">
                    <Heading size="sm">{cutId}번째 사진</Heading>
                    <HStack spacing={1} alignItems="center">
                        <Button
                            color={isVoted ? 'pink.400' : votedButtonColor}
                            aria-label="like-this-cut-button"
                            leftIcon={<FaHeart />}
                            isLoading={voteLoading}
                            onClick={() => vote()}
                        >
                            <Text>{votesCount}</Text>
                        </Button>
                        <Button colorScheme="teal">감상 남기기</Button>
                    </HStack>
                </Flex>
            </Box>
        </Box>
    );
}
