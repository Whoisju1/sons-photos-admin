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
import { EmailService } from '../services/emailService';
import * as config from '../config';

const secret = Buffer.from(config.JWT_SECRETE, 'base64');
const app = express();
const path = '/graphql';

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
    emailService: new EmailService({
      SmtpFromAddress: config.EMAIL_FROM,
      SmtpServerConnectionString: config.EMAIL_CONNECTION_STRING,
    }),
  }),
});

server.applyMiddleware({ app, path });

app.listen(config.PORT, () => console.log(`Server ready on http://localhost:${config.PORT}`));
