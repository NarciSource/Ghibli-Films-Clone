import { Box, Button, Flex, Link, Stack, useColorModeValue } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Link as RouterLink } from 'react-router-dom';
import { useMemo } from 'react';
import { useMeQuery } from '../../generated/graphql';
import LoggedInNavbarItem from './LoggedInNavbarItem';

export function Navbar() {
    const accessToken = localStorage['access_token'];
    const { data } = useMeQuery({ skip: !accessToken });
    const isLoggedIn = useMemo(() => accessToken && data?.me?.id, [accessToken, data?.me?.id]);

    return (
        <Box
            zIndex={10}
            position="fixed"
            w="100%"
            bg={useColorModeValue('white', 'gray.800')}
            borderBottom={1}
            borderStyle="solid"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            py={{ base: 2 }}
            px={{ base: 4 }}
        >
            <Flex color={useColorModeValue('gray.600', 'white')} maxW="960px" minH="60px" align="center" m="auto">
                <Flex flex={{ base: 1, md: 'auto' }}>
                    <Link
                        as={RouterLink}
                        to="/"
                        fontFamily="heading"
                        fontWeight="bold"
                        color={useColorModeValue('gray.800', 'white')}
                    >
                        GhibliBestCut
                    </Link>
                </Flex>

                {isLoggedIn ? (
                    <LoggedInNavbarItem />
                ) : (
                    <Stack justify="flex-end" direction="row" spacing="6">
                        <ColorModeSwitcher />

                        <Button as={RouterLink} to="/login" fontSize="sm" fontWeight="400" variant="link">
                            로그인
                        </Button>
                        <Button
                            as={RouterLink}
                            to="/signup"
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize="sm"
                            fontWeight="600"
                            colorScheme="teal"
                        >
                            시작하기
                        </Button>
                    </Stack>
                )}
            </Flex>
        </Box>
    );
}
