import { ApolloServer, gql } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db/knex';
import resolvers from '../resolvers';
import fs from 'fs';
import { EmailService } from '../services/emailService';
import * as config from '../config';
import { AuthorizationDirective } from '../directiveResolvers/AuthorizationDirective';

const types = fs.readFileSync('./src/schema.graphql', { encoding: 'utf8' });

const app = express();
const path = '/graphql';
const typeDefs = gql`
  ${types}
`;

app.use(cors(), bodyParser.json(), bodyParser.urlencoded({ extended: true }));

const getToken = (req: Request) =>
  req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: true,
  schemaDirectives: {
    authorization: AuthorizationDirective,
  },
  context: ({ req }: { req: Request }) => ({
    req,
    db,
    jwt,
    bcrypt,
    token: getToken(req),
    user: getToken(req) ? jwt.decode(getToken(req) as string) : null,
    emailService: new EmailService({
      SmtpFromAddress: config.EMAIL_FROM,
      SmtpServerConnectionString: config.EMAIL_CONNECTION_STRING,
    }),
    engine: {
      apiKey: config.ENGINE_API_KEY,
    },
  }),
});

server.applyMiddleware({ app, path });

const { PORT = 4000 } = config;

app.listen(PORT, () => {
  console.log(`🚀  Server ready at http://localhost:${PORT}`);
  console.log(
    `🚀  GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`,
  );
});
