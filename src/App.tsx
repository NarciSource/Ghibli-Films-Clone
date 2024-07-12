import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, Box, Text, theme } from '@chakra-ui/react';
import * as React from 'react';
import FilmList from './components/film/FilmList';
import { createApolloClient } from './apollo/createApolloClient';

const apolloClient = createApolloClient();

export const App: React.FC = () => (
    <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
            <Box>
                <Text>Ghibli GraphQL</Text>
                <FilmList></FilmList>
            </Box>
        </ChakraProvider>
    </ApolloProvider>
);
