import { ApolloClient, from, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { createApolloCache } from './createApolloCache';
import authLink from './middleware/authLink';
import errorLink from './middleware/errorLink';

const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_API_HOST}/graphql`,
    credentials: 'include', // 자격 증명 모드, 쿠키 전송
    // - same-origin : 같은 출처간 요청에만 인증정보를 담을 수 있다.
    // - include : 모든 요청에 인증정보를 담을 수 있다.
    // - omit : 모든 요청에 인증 정보를 담지 않는다.
});

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
    (apolloClient = new ApolloClient({
        uri: `${process.env.REACT_APP_API_HOST}/graphql`,
        link: from([authLink, errorLink, httpLink]),
        cache: createApolloCache(),
    }));

export let apolloClient: ApolloClient<NormalizedCacheObject>;
