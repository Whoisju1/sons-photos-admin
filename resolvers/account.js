import requireAuth from '../resolverMiddleware/requireAuth';

const account = async (root, args, { db, request: { user } }) => {
  if (!user) return new Error('Please sign in');
  // get user id
  const { account_id: accountID } = user.sub; // eslint-disable-line camelcase
  const [accountInfo] = await db
    .select()
    .where({ accountID })
    .from('account_view');

  return accountInfo;
};

export default requireAuth(account);
