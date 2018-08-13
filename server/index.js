import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors';
import typeDefs from '../typeDefs';
import resolvers from '../resolvers';
import db from '../db/knex';

require('dotenv').config();

const secret = Buffer.from(process.env.JWT_SECRETE, 'base64');
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
  context: ({ req }) => ({
    req,
    db,
    jwt,
    bcrypt,
    secret,
  }),
  formatError: (err) => {
    console.log(err); // eslint-disable-line no-console
    return err;
  },
  formatResponse: (res) => {
    console.log(res); // eslint-disable-line no-console
    return res;
  },
});

server.applyMiddleware({ app, path });

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)); // eslint-disable-line no-console
