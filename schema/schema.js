import { GraphQLSchema } from 'graphql';

import query from './query';
// const mutation = require('./mutation');

const schema = new GraphQLSchema({
  query,
  // mutation,
});

export default schema;
