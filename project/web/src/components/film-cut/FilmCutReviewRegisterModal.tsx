import {
    Button,
    ButtonGroup,
    FormControl,
    FormErrorMessage,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import {
    CreateOrUpdateReviewMutationVariables,
    CutDocument,
    CutQuery,
    CutQueryVariables,
    useCreateOrUpdateReviewMutation,
} from '../../generated/graphql';
import { useForm } from 'react-hook-form';

export default function FilmCutReviewRegisterModal({
    cutId,
    isOpen,
    onClose,
}: {
    cutId: number;
    isOpen: boolean;
    onClose: () => void;
}): React.ReactElement {
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateOrUpdateReviewMutationVariables>({
        defaultValues: { cutReviewInput: { cutId } },
    });

    const [mutation, { loading }] = useCreateOrUpdateReviewMutation();
    function onSubmit(formData: CreateOrUpdateReviewMutationVariables) {
        mutation({
            variables: formData,
            update: (cache, fetchResult) => {
                // 쿼리 캐시 데이터 조회
                const currentCut = cache.readQuery<CutQuery, CutQueryVariables>({
                    query: CutDocument,
                    variables: { cutId },
                });

                if (currentCut?.cutReviews)
                    if (fetchResult.data?.createOrUpdateReview) {
                        const isEdited = currentCut.cutReviews.some(
                            (review) => review.id === fetchResult.data?.createOrUpdateReview?.id,
                        );
                        // 수정된 리뷰가 존재할 경우 해당 리뷰 캐시 데이터 삭제
                        if (isEdited) {
                            cache.evict({ id: `CutReview:${fetchResult.data?.createOrUpdateReview?.id}` });
                        }

                        // 쿼리 캐시 데이터 덮어쓰기
                        cache.writeQuery<CutQuery, CutQueryVariables>({
                            query: CutDocument,
                            data: {
                                ...currentCut,
                                cutReviews: isEdited
                                    ? [...currentCut.cutReviews]
                                    : [fetchResult.data.createOrUpdateReview, ...currentCut.cutReviews.slice(0, 1)],
                            },
                            variables: { cutId },
                        });
                    }
            },
        })
            .then(onClose)
            .catch((err) => {
                toast({ title: '리뷰 등록에 실패했습니다.', status: 'error' });
            });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader>리뷰 등록</ModalHeader>
                <ModalBody>
                    <FormControl isInvalid={!!errors.cutReviewInput?.contents}>
                        <Textarea
                            {...register('cutReviewInput.contents', {
                                required: { value: true, message: '리뷰 내용을 입력해주세요.' },
                                maxLength: { value: 500, message: '리뷰 내용은 500자 이내로 작성해주세요.' },
                            })}
                            placeholder="장면에 대한 개인적인 감상을 남겨주세요."
                        />
                        <FormErrorMessage>{errors.cutReviewInput?.contents?.message}</FormErrorMessage>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <Button colorScheme="gray" onClick={onClose}>
                            취소
                        </Button>
                        <Button colorScheme="teal" type="submit" isDisabled={loading}>
                            등록
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
