import db from '../../../db/knex';
import bcrypt from 'bcrypt';
import { createAccount as saveAccount } from '../../../services/accountCreation';
import {
  MutationCreateAccountResolver,
  Role,
  MutationEditAccountOwnResolver,
  MutationChangePasswordResolver,
} from '../../../resolver-types';

interface ISub {
  user: {
    sub: {
      id: string;
      role: Role;
    };
  };
}

// create account
export const createAccount: MutationCreateAccountResolver =
  async (root, args) => {
  try {
    const { input } = args;
    return await saveAccount({ ...input, phone: input.phone || null });
  } catch (err) {
    return err;
  }
};

export const editAccountOwn: MutationEditAccountOwnResolver<{}, {}, ISub> =
  async (root, { input }, { user: { sub: { id } }}) => {
    const [editedUser] = await db('account')
      .update(input)
      .where({ id })
      .returning('*');
    return editedUser;
  };

export const changePassword: MutationChangePasswordResolver<{}, {}, ISub> = async (root, { password }, { user }) => {
  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const [editedUser] = await db('account')
      .update({ password: hashedPassword })
      .where({ id: user.sub.id })
      .returning('*');

    return editedUser;
  } catch (e) {
    return e;
  }
};
