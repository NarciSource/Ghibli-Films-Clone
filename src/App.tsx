import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider, Box, Text, theme } from '@chakra-ui/react';
import * as React from 'react';
import FilmList from './components/film/FilmList';
import { PaginatedFilms } from './generated/graphql';

const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    // 클라이언트 캐시
    cache: new InMemoryCache({
        // 필드별 쿼리 및 뮤테이션이 진행된 이후 해당 필드의 캐시를 어떻게 처리할지
        typePolicies: {
            Query: {
                fields: {
                    films: {
                        keyArgs: false,
                        merge: (existing: PaginatedFilms | undefined, incoming: PaginatedFilms): PaginatedFilms => {
                            return {
                                cursor: incoming.cursor,
                                films: existing ? [...existing.films, ...incoming.films] : incoming.films,
                            };
                        },
                    },
                },
            },
        },
    }),
});

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
