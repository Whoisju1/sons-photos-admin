import { generateToken } from '../../../services/userTokenGenerator';
import { QueryGetAccountResolver, Role, QueryLoginResolver } from '../../../resolver-types';
import Knex from 'knex';
import bcrypt from 'bcrypt';
import { ApolloError, UserInputError } from 'apollo-server-express';

interface IUser {
  sub: {
    id: string;
    role: Role;
  };
}

// get account
export const getAccount: QueryGetAccountResolver<{}, {}, { db: Knex, user: IUser }>
= async (root, args, { db, user }) => {
  try {
    // get user id
    const { id } = user.sub; // eslint-disable-line camelcase
    const [accountInfo] = await db
      .select()
      .where({ id })
      .from('account');

    return accountInfo;
  } catch (err) {
    return err;
  }
};

export const login: QueryLoginResolver<{}, {}, { db: Knex }>
= async (root, { input: { username, password } }, { db }) => {
  try {
    // fetch user from database
    const [userInfo] = await db('account')
      .select('*')
      .where({ username });

    // check if user exits
    if (!userInfo) return new UserInputError('User not found', {
      inputField: 'username',
    });

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, userInfo.password);
    if (!isPasswordCorrect) return new UserInputError('Incorrect password', {
      inputField: 'password',
    });

    // if all is well create token
    const { id, role } = userInfo; // eslint-disable-line camelcase
    userInfo.token = generateToken({ id, role });

    // remove password from payload
    delete userInfo.password;

    return userInfo;
  } catch (e) {
    return e;
  }
};
