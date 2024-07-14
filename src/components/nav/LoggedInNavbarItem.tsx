import { Avatar, Stack } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export default function LoggedInNavbarItem(): React.ReactElement {
    return (
        <Stack justify="flex-end" alignItems="center" direction="row" spacing={3}>
            <ColorModeSwitcher />
            <Avatar size="sm" />
        </Stack>
    );
}
