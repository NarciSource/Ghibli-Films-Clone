import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import { verifyAccessTokenFromReqHeaders } from '../utils/jwt-auth';
import redis from '../redis/redis-client';
import IContext from './IContext';
import resolvers from '../resolvers';

export default async function createApolloServer(): Promise<ApolloServer> {
    return new ApolloServer({
        // 생성된 스키마와 그에 연결되어있는 리졸버를 통해 GraphQL 서버를 구성
        schema: await buildSchema({
            // 리졸버를 토대로 GraphQL 스키마를 자동으로 생성
            resolvers,
        }),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context: ({ req, res }: IContext) => {
            // context에 인증값 추가
            const verified = verifyAccessTokenFromReqHeaders(req.headers);
            return { req, res, verifiedUser: verified, redis };
        },
    });
}
