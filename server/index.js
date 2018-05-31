import express from 'express';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import fs from 'fs';
import logger from 'morgan';
import bodyParser from 'body-parser';
import resolvers from '../resolvers';
import db from '../db/knex';

require('dotenv').config();

const secret = Buffer.from(process.env.JWT_SECRETE, 'base64');
const app = express();
const { PORT } = process.env;

// ues middleware
app.use(
  logger('dev'),
  cors(),
  bodyParser.json(),
  expressJwt({
    secret,
    credentialsRequired: false,
  }),
);

// get schema from graphql file using fs module
const typeDefs = fs.readFileSync('schema.graphql', { encoding: 'utf8' });
const schema = makeExecutableSchema({ typeDefs, resolvers });

// set up graphql endpoint
app.use('/graphql', graphqlExpress(request => ({
  schema,
  context: {
    request, // the express request object
    db,
    jwt,
    bcrypt,
    secret,
  },
})));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // use graphiql for testing graphql endpoint

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)); // eslint-disable-line no-console
