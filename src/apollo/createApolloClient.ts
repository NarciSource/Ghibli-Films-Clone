import { ApolloClient, from, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { createApolloCache } from './createApolloCache';
import authLink from './middleware/authLink';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include', // 자격 증명 모드, 쿠키 전송
    // - same-origin : 같은 출처간 요청에만 인증정보를 담을 수 있다.
    // - include : 모든 요청에 인증정보를 담을 수 있다.
    // - omit : 모든 요청에 인증 정보를 담지 않는다.
});

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
    new ApolloClient({
        link: from([authLink, httpLink]),
        cache: createApolloCache(),
    });
