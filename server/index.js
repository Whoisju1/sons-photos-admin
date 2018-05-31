import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import fs from 'fs';
import logger from 'morgan';
import bodyParser from 'body-parser';
import resolvers from '../resolvers';

require('dotenv').config();

const app = express();
const { PORT } = process.env;

// ues middleware
// use morgan for logging to request details to the console
app.use(logger('dev'));

app.use(bodyParser.json());

// get schema from graphql file using fs module
const typeDefs = fs.readFileSync('schema.graphql', { encoding: 'utf8' });
const schema = makeExecutableSchema({ typeDefs, resolvers });

// set up graphql endpoint
app.use('/graphql', graphqlExpress(request => ({
  schema,
  context: {
    request, // the express request object
  },
})));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // use graphiql for testing graphql endpoint

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)); // eslint-disable-line no-console
