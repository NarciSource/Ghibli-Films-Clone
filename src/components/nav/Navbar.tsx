import { Box, Button, Flex, Link, Stack } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Link as RouterLink } from 'react-router-dom';

export function Navbar() {
    return (
        <Box>
            <Flex>
                <Flex>
                    <Link as={RouterLink} to="/">
                        GhibliBestCut
                    </Link>
                </Flex>

                <Stack>
                    <ColorModeSwitcher />

                    <Button as={RouterLink} to="/login">
                        로그인
                    </Button>
                    <Button as={RouterLink} to="/signup">
                        시작하기
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
}
