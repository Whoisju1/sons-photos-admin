import { ResolverFn } from 'apollo-server-express';
import db from '../db/knex';

const editOwnAccount: ResolverFn = async (root, { input }, { user: { sub: { accountID } }}) => {
  const [editedUser] = await db('account')
    .update(input)
    .where({ accountID })
    .returning('*');
  return editedUser;
};

export default editOwnAccount;
