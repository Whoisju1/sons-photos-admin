const createAccount = async (root, { input: accountInfo }, {
  bcrypt, db, jwt, secret,
}) => {
  try {
    accountInfo.password = await bcrypt.hash(accountInfo.password, 10); // eslint-disable-line
    const [newAccount] = await db
      .returning('*')
      .insert(accountInfo)
      .into('account');

    const { accountID } = newAccount;
    newAccount.token = jwt.sign({ sub: { accountID } }, secret);

    return newAccount;
  } catch (err) {
    return err;
  }
};

export default createAccount;
