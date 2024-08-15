import { AspectRatio, Box, Button, Flex, Heading, HStack, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { CutDocument, CutQuery, CutQueryVariables, useVoteMutation } from '../../generated/graphql';
import { FaHeart } from 'react-icons/fa';

type FilmCutDetailProps = Exclude<CutQuery['cut'], null | undefined>;

export default function FilmCutDetail({
    id: cutId,
    src: cutImg,
    isVoted = false,
    votesCount = 0,
}: FilmCutDetailProps): React.ReactElement {
    const votedButtonColor = useColorModeValue('gray.500', 'gray.400');

    const [vote, { loading: voteLoading }] = useVoteMutation({
        variables: { cutId },
        // 캐시 조절
        update: (cache, fetchResult) => {
            // 쿼리 캐시 데이터 조회
            const currentCut = cache.readQuery<CutQuery, CutQueryVariables>({
                query: CutDocument,
                variables: { cutId },
            });

            if (currentCut?.cut) {
                if (fetchResult.data?.vote) {
                    // 쿼리 캐시 데이터 덮어쓰기
                    cache.writeQuery<CutQuery, CutQueryVariables>({
                        query: CutDocument,
                        variables: { cutId: currentCut.cut.id },
                        data: {
                            __typename: 'Query',
                            ...currentCut,
                            cut: {
                                ...currentCut.cut,
                                votesCount: isVoted ? currentCut.cut.votesCount - 1 : currentCut.cut.votesCount + 1,
                                isVoted: !isVoted,
                            },
                        },
                    });
                }
            }
        },
    });

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
