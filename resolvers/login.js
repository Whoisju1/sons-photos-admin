const login = async (root, { input: { username, password } }, {
  db, bcrypt, jwt, secret,
}) => {
  try {
    // fetch user from database
    const [userInfo] = await db('account')
      .column(
        { accountID: 'account_id' },
        { firstName: 'first_name' },
        { lastName: 'last_name' },
        { createdAt: 'created_at' },
        'company_id',
        'email',
        'phone',
        'username',
        'password',
      )
      .where({ username });

    // check if user exits
    if (!userInfo) return new Error('User does not exit');

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, userInfo.password);
    if (!isPasswordCorrect) return new Error('Incorrect password');

    // if all is well create token
    const { account_id } = userInfo; // eslint-disable-line camelcase
    userInfo.token = await jwt.sign({ sub: { account_id } }, secret);

    // remove password from payload
    delete userInfo.password;

    return userInfo;
  } catch (e) {
    return e;
  }
};

export default login;
