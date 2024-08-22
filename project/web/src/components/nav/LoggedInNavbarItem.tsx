import { Avatar, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useLogoutMutation } from '../../generated/graphql';
import { useApolloClient } from '@apollo/client';

export default function LoggedInNavbarItem(): React.ReactElement {
    const [logout, { loading: logoutLoading }] = useLogoutMutation();
    const client = useApolloClient();

    async function onLogoutClick() {
        try {
            await logout();

            localStorage.removeItem('access_token');

            await client.resetStore(); // 아폴로 클라이언트 캐시 리셋
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Stack justify="flex-end" alignItems="center" direction="row" spacing={3}>
            <ColorModeSwitcher />

            <Menu>
                <MenuButton>
                    <Avatar size="sm" />
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={onLogoutClick} isDisabled={logoutLoading}>
                        로그아웃
                    </MenuItem>
                </MenuList>
            </Menu>
        </Stack>
    );
}
