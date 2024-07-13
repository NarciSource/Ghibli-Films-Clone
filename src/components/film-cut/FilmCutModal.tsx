import {
    Center,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spinner,
} from '@chakra-ui/react';
import { useCutQuery } from '../../generated/graphql';
import FilmCutDetail from './FilmCutDetail';

interface FilmCutModalProps {
    open: boolean;
    onClose: () => void;
    cutId: number;
}

export default function FilmCutModal({ open, onClose, cutId }: FilmCutModalProps): React.ReactElement {
    const { loading, data } = useCutQuery({ variables: { cutId } });

    return (
        <Modal isOpen={open} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{data?.cut?.film?.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {loading && (
                        <Center>
                            <Spinner />
                        </Center>
                    )}
                    {!loading && !data && <Center>데이터를 불러오지 못했습니다.</Center>}
                    {data?.cut && <FilmCutDetail cut={data.cut} />}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
