import {
    Center,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useBreakpointValue,
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
    // 화면 가로 크기에 따라 다른 변수를 할당
    const modalSize = useBreakpointValue({ base: 'full', md: 'xl' });

    return (
        <Modal isOpen={open} onClose={onClose} isCentered size={modalSize} preserveScrollBarGap>
            <ModalOverlay />
            <ModalContent pt={2}>
                <ModalHeader>{data?.cut?.film?.title}</ModalHeader>
                <ModalCloseButton ml={3} />
                <ModalBody>
                    {loading && (
                        <Center py={4}>
                            <Spinner />
                        </Center>
                    )}
                    {!loading && !data && <Center>데이터를 불러오지 못했습니다.</Center>}
                    {data?.cut && <FilmCutDetail {...data.cut} reviews={data.cutReviews} />}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
