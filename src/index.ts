import 'reflect-metadata';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import http from 'http';
import { buildSchema } from 'type-graphql';
import { FilmResolver } from './resolvers/Film';

async function main() {
    const app = express();

    const apolloServer = new ApolloServer({
        // 생성된 스키마와 그에 연결되어있는 리졸버를 통해 GraphQL 서버를 구성
        schema: await buildSchema({
            // 리졸버를 토대로 GraphQL 스키마를 자동으로 생성
            resolvers: [FilmResolver],
        }),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const httpServer = http.createServer(app);

    httpServer.listen(process.env.PORT || 4000, () => {
        if (process.env.NODE_ENV !== 'production') {
            console.log(`
                server started on => http://localhost:4000
                graphql playground => http://localhost:4000/graphql`);
        } else {
            console.log(`Production server Started...`);
        }
    });
}

main().catch((err) => console.error(err));
