import dotenv from "dotenv";
import express from "express";
import http from "http";
import "reflect-metadata";
import { createDB } from "./db/db-client";
import createApolloServer from "./apollo/createApolloServer";
import cookieParser from "cookie-parser";

dotenv.config();

async function main() {
    await createDB();
    const app = express();
    app.use((req, res, next) => {
        res.setHeader("Referrer-Policy", "no-referrer");
        next();
    }, cookieParser()); // cookie-parser 미들웨어 추가

    app.get("/", (req, res) => {
        res.status(200).send(); // for healthcheck
    });

    const apolloServer = await createApolloServer();
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: [process.env.DOMAIN, "https://studio.apollographql.com"],
            credentials: true,
        },
    });

    const httpServer = http.createServer(app);

    httpServer.listen(process.env.PORT || 4000, () => {
        if (process.env.NODE_ENV !== "production") {
            console.log(`
                server started on => http://localhost:4000
                graphql playground => http://localhost:4000/graphql`);
        } else {
            console.log(`Production server Started...`);
        }
    });
}

main().catch((err) => console.error(err));
