import { combineResolvers, skip } from 'graphql-resolvers';
import db from '../db/knex';

const isAuthenticated = async (root, args, { req: { user = null } }) => {
  try {
    if (!user) return new Error('Unauthorized!');

    const { accountID } = user.sub; // eslint-disable-line camelcase
    const foundUser = await db
      .select('accountID')
      .where({ accountID })
      .from('account');

    // user doesn't exist in database return an error of Unauthorized
    if (!foundUser.length) return new Error('Unauthorized!');

    return user
      ? skip
      : new Error('Unauthorized!');
  } catch (err) {
    return err;
  }
};

export default resolver => combineResolvers(
  isAuthenticated,
  resolver,
);
