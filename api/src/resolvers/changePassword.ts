import { ResolverFn } from 'apollo-server-express';
import db from '../db/knex';
import bcrypt from 'bcrypt';

const changePassword: ResolverFn = async (root, { password }, { user }) => {
  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const [editedUser] = await db('account')
      .update({ password: hashedPassword })
      .where({ accountID: user.sub.accountID })
      .returning('*');

    return editedUser;
  } catch (e) {
    return e;
  }
};

export default changePassword;
