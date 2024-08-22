import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { CutQuery } from '../../generated/graphql';

export default function FilmCutReviewDeleteAlert({
    target,
    isOpen,
    onClose,
}: {
    target?: CutQuery['cutReviews'][0];
    isOpen: boolean;
    onClose: () => void;
}): React.ReactElement {
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>감상 삭제</AlertDialogHeader>
                    <AlertDialogBody>정말로 삭제하시겠습니까?</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            취소
                        </Button>
                        <Button colorScheme="red" ml={3}>
                            삭제
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
