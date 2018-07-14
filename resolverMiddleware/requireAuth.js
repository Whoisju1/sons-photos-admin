import { skip, combineResolvers } from 'graphql-resolvers';

const isAuthenticated = (root, args, { request: { user } }) =>
  (user ? skip : new Error('Unauthorized!'));

export default resolver => combineResolvers(
  isAuthenticated,
  resolver,
);
