const createAccount = async (root, { input: accountInfo }, {
  bcrypt, db, jwt, secret,
}) => {
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

    const { accountID, firstName, lastName } = newAccount;
    newAccount.token = jwt.sign({ accountID, firstName, lastName }, secret);

    return newAccount;
  } catch (err) {
    return err;
  }
};

export default createAccount;
