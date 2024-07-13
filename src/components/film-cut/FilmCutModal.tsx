import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import FilmCutDetail from './FilmCutDetail';

interface FilmCutModalProps {
    open: boolean;
    onClose: () => void;
}

export default function FilmCutModal({ open, onClose }: FilmCutModalProps): React.ReactElement {
    return (
        <Modal isOpen={open} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FilmCutDetail />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
