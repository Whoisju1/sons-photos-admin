import { skip, combineResolvers } from 'graphql-resolvers';

const isAuthenticated = (root, args, { req: { user = null } }) => (user ? skip : new Error('Unauthorized!'));

export default resolver => combineResolvers(
  isAuthenticated,
  resolver,
);
