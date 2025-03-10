import { BackgroundProps, Box, Flex } from '@chakra-ui/react';
import { Navbar } from './nav/Navbar';

interface CommonLayoutProps {
    bg?: BackgroundProps['bg'];
    children: React.ReactNode;
}

export default function CommonLayout({ bg, children }: CommonLayoutProps): React.ReactElement {
    return (
        <div>
            <Flex justify="center">
                <Navbar />
            </Flex>
            <Box px={{ base: 4 }} pt="24" mx="auto" maxW="960px" minH="100vh" w="100%" bg={bg}>
                {children}
            </Box>
        </div>
    );
}
