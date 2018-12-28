import bcrypt from 'bcrypt';
import db from '../db/knex';
import { generateToken } from './tokenCreation';

export type Role = 'superAdmin' | 'admin' | 'user';

export interface IAccountInput {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  role: Role;
}

export interface IAccountInfo {
  accountID: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: string;
  token: string;
}

export const createAccount = async (accountInfo: IAccountInput): Promise<IAccountInfo> => {
  try {
    accountInfo.password = await bcrypt.hash(accountInfo.password, 10);
    const [newAccount]: IAccountInfo[] = await db
      .returning('*')
      .insert(accountInfo)
      .into('account');

    const { accountID } = newAccount;
    newAccount.token = generateToken(accountID);

    return newAccount;
  } catch (err) {
    return err;
  }
};
