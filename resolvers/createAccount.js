const createAccount = async (root, { input: accountInfo }, { bcrypt, db }) => {
  try {
    accountInfo.password = await bcrypt.hash(accountInfo.password, 10); // eslint-disable-line
    const [newAccount] = await db
      .returning([
        { accountID: 'account_id' },
        { firstName: 'first_name' },
        { lastName: 'last_name' },
        { createdAt: 'created_at' },
        'company_id',
        'email',
        'phone',
        'username',
      ])
      .insert(accountInfo)
      .into('account');

    return newAccount;
  } catch (err) {
    return err;
  }
};

export default createAccount;
