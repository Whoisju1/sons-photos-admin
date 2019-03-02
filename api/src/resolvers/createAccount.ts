import { ResolverFn } from 'apollo-server-express';
import { createAccount as saveAccount, IAccountInput } from '../services/accountCreation';

const createAccount: ResolverFn = async (root, { input: accountInfo }: { input: IAccountInput }) => {
  try {
    return await saveAccount(accountInfo);
  } catch (err) {
    return err;
  }
};

export default createAccount;
