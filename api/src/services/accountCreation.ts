import bcrypt from 'bcrypt';
import db from '../db/knex';
import { generateToken } from './userTokenGenerator';
import { Role } from '../resolver-types';

export interface IAccountInput {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone?: string | null | undefined;
  role: Role;
}

export interface IAccountInfo {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string | null | undefined;
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

    const { id, role } = newAccount;
    newAccount.token = generateToken({ id, role });

    return newAccount;
  } catch (err) {
    return err;
  }
};
