import {
    AspectRatio,
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Image,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { CutDocument, CutQuery, CutQueryVariables, useMeQuery, useVoteMutation } from '../../generated/graphql';
import { FaHeart } from 'react-icons/fa';
import { useMemo } from 'react';

type FilmCutDetailProps = Exclude<CutQuery['cut'], null | undefined>;

export default function FilmCutDetail({
    id: cutId,
    src: cutImg,
    isVoted = false,
    votesCount = 0,
}: FilmCutDetailProps): React.ReactElement {
    const toast = useToast();
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

    const accessToken = localStorage.getItem('access_token');
    const { data: userData } = useMeQuery({ skip: !accessToken }); // 조건부 쿼리 실행
    const isLoggedIn = useMemo(() => {
        if (accessToken) {
            return userData?.me?.id;
        }
        return false;
    }, [accessToken, userData?.me?.id]);

    const showVoteResult = () => {
        if (isLoggedIn) {
            vote();
        } else {
            toast({
                status: 'warning',
                description: '좋아요 표시는 로그인 후 가능합니다.',
            });
        }
    };

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
                            onClick={showVoteResult}
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
