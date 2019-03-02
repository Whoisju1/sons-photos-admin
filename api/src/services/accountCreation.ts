import bcrypt from 'bcrypt';
import db from '../db/knex';
import { generateToken } from './userTokenGenerator';
import { Role } from '../typeDefs';

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
  accountID: number;
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
      .returning(['accountID', 'role'])
      .insert(accountInfo)
      .into('account');

    const { accountID, role } = newAccount;
    newAccount.token = generateToken({ accountID, role });

    return newAccount;
  } catch (err) {
    return err;
  }
};
