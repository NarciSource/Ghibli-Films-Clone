import { ApolloClient, from, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { createApolloCache } from './createApolloCache';
import authLink from './middleware/authLink';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
    new ApolloClient({
        link: from([authLink, httpLink]),
        cache: createApolloCache(),
    });
