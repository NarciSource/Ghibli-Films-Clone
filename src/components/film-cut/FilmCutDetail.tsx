import {
    AspectRatio,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    HStack,
    Image,
    SimpleGrid,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { CutDocument, CutQuery, CutQueryVariables, useMeQuery, useVoteMutation } from '../../generated/graphql';
import { FaHeart } from 'react-icons/fa';
import { useMemo } from 'react';
import FilmCutReviewRegisterModal from './FilmCutReviewRegisterModal';
import FilmCutReview from './FilmCutReview';
import FilmCutReviewDeleteAlert from './FilmCutReviewDeleteAlert';

type FilmCutDetailProps = Exclude<CutQuery['cut'], null | undefined> & {
    reviews: CutQuery['cutReviews'];
};

export default function FilmCutDetail({
    id: cutId,
    src: cutImg,
    isVoted = false,
    votesCount = 0,
    reviews,
}: FilmCutDetailProps): React.ReactElement {
    const toast = useToast();
    const reviewRegisterDialog = useDisclosure();
    const deleteAlert = useDisclosure();
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
                        <Button colorScheme="teal" onClick={reviewRegisterDialog.onOpen}>
                            감상 남기기
                        </Button>
                    </HStack>
                </Flex>

                <Box mt={6}>
                    {!reviews?.length ? (
                        <Center minH={100}>
                            <Text>제일 먼저 감상을 남겨보세요!</Text>
                        </Center>
                    ) : (
                        <SimpleGrid mt={3} spacing={4} columns={{ base: 1, sm: 2 }}>
                            {reviews.map((review) => (
                                <FilmCutReview
                                    key={review.id}
                                    {...review}
                                    onEditClick={reviewRegisterDialog.onOpen}
                                    onDeleteClick={deleteAlert.onOpen}
                                />
                            ))}
                        </SimpleGrid>
                    )}
                </Box>
            </Box>

            <FilmCutReviewRegisterModal
                cutId={cutId}
                isOpen={reviewRegisterDialog.isOpen}
                onClose={reviewRegisterDialog.onClose}
            />

            <FilmCutReviewDeleteAlert
                target={reviews.find((review) => review.isMine)}
                isOpen={deleteAlert.isOpen}
                onClose={deleteAlert.onClose}
            />
        </Box>
    );
}
