import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { resolvers, schema } from "./schema/schema";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}); 