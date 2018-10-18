import { ApolloServer } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import db from '../db/knex';
import resolvers from '../resolvers';
import typeDefs from '../typeDefs';

require('dotenv').config();

const secret = Buffer.from(process.env.JWT_SECRETE || '', 'base64');
const app = express();
const path = '/graphql';
const { PORT } = process.env;

// ues middleware
app.use(
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  expressJwt({
    secret,
    credentialsRequired: false,
  }),
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: any }) => ({
    req,
    db,
    jwt,
    bcrypt,
    secret,
  }),
});

server.applyMiddleware({ app, path });

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)); // eslint-disable-line no-console
