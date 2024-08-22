import { Avatar, Box, Divider, Flex, HStack, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { CutQuery } from '../../generated/graphql';
import { MdDelete, MdEdit } from 'react-icons/md';

type FilmCutReviewProps = CutQuery['cutReviews'][0] & { onEditClick: () => void; onDeleteClick: () => void };

export default function FilmCutReview({
    user: { username: author },
    contents,
    isMine,
    onEditClick,
    onDeleteClick,
}: FilmCutReviewProps): React.ReactElement {
    return (
        <Box borderWidth="thin" borderRadius="lg" shadow="sm" p={2} minH={150}>
            <Flex p={2} justifyContent="space-between">
                <HStack>
                    <Avatar size="sm" />
                    <Text>{author}</Text>
                </HStack>
                {isMine && (
                    <HStack spacing={0}>
                        <Tooltip hasArrow label="감상 수정">
                            <IconButton
                                aria-label="edit-review"
                                variant="ghost"
                                size="sm"
                                icon={<MdEdit />}
                                onClick={onEditClick}
                            />
                        </Tooltip>
                        <Tooltip hasArrow label="감상 삭제">
                            <IconButton
                                aria-label="delete-review"
                                variant="ghost"
                                size="sm"
                                icon={<MdDelete />}
                                onClick={onDeleteClick}
                            />
                        </Tooltip>
                    </HStack>
                )}
            </Flex>
            <Divider />
            <Box mt={2} p={2}>
                <Text>{contents}</Text>
            </Box>
        </Box>
    );
}
