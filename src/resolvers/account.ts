import { ResolverFn } from 'apollo-server-express';

const account: ResolverFn = async (root, args, { db, user }) => {
  try {
    // get user id
    const { accountID } = user.sub; // eslint-disable-line camelcase
    const [accountInfo] = await db
      .select()
      .where({ accountID })
      .from('account');

    return accountInfo;
  } catch (err) {
    return err;
  }
};

export default account;
