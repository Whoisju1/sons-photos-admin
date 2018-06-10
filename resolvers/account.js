const account = async (root, args, { db, user }) => {
  // get user id from user property of request object
  const { account_id } = user.sub; // eslint-disable-line camelcase

  const [accountInfo] = await db
    .column(
      { accountID: 'account_id' },
      { firstName: 'first_name' },
      { lastName: 'last_name' },
      { createdAt: 'created_at' },
      'company_id',
      'email',
      'phone',
      'username',
    )
    .where({ account_id })
    .from('account');

  // make sure that token is null
  // ...because client should only be able to receive token upon sign up or sign in
  accountInfo.token = null;

  return accountInfo;
};

export default account;
