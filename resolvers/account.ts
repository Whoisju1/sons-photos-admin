import requireAuth from '../resolverMiddleware/requireAuth';

const account = async (root, args, { db, req: { user } }) => {
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

export default requireAuth(account);
