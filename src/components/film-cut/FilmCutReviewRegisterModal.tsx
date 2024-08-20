import {
    Button,
    ButtonGroup,
    FormControl,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
} from '@chakra-ui/react';

export default function FilmCutReviewRegisterModal({
    cutId,
    isOpen,
    onClose,
}: {
    cutId: number;
    isOpen: boolean;
    onClose: () => void;
}): React.ReactElement {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form">
                <ModalHeader>리뷰 등록</ModalHeader>
                <ModalBody>
                    <FormControl>
                        <Textarea placeholder="장면에 대한 개인적인 감상을 남겨주세요." />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <Button colorScheme="gray" onClick={onClose}>
                            취소
                        </Button>
                        <Button colorScheme="teal" type="submit" form="review-form">
                            등록
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
