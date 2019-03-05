import { ResolverFn } from 'apollo-server-express';

const account: ResolverFn = async (root, args, { db, user }) => {
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

export default account;
