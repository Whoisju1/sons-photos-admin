import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import fs from 'fs';
import logger from 'morgan';
import bodyParser from 'body-parser';
import resolvers from '../resolvers';

require('dotenv').config(); // eslint-disable-line

const app = express();
const { PORT } = process.env;

// ues middleware
app.use(logger('dev'));

app.use(bodyParser.json());

const typeDefs = fs.readFileSync('schema.graphql', { encoding: 'utf8' });
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use('/graphql', graphqlExpress(request => ({
  schema,
  context: {
    request,
  },
})));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)); // eslint-disable-line no-console
