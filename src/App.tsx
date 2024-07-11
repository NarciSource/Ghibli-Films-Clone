import { ChakraProvider, Box, Text, theme } from '@chakra-ui/react';

export const App = () => (
    <ChakraProvider theme={theme}>
        <Box>
            <Text>Ghibli GrpahQL</Text>
        </Box>
    </ChakraProvider>
);
