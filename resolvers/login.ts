const login = async (root, { input: { username, password } }, {
  db, bcrypt, jwt, secret,
}) => {
  try {
    // fetch user from database
    const [userInfo] = await db('account')
      .select('*')
      .where({ username });

    // check if user exits
    if (!userInfo) return new Error('User not found');

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, userInfo.password);
    if (!isPasswordCorrect) return new Error('Incorrect password');

    // if all is well create token
    const { accountID } = userInfo; // eslint-disable-line camelcase
    userInfo.token = await jwt.sign({ sub: { accountID } }, secret);

    // remove password from payload
    delete userInfo.password;

    return userInfo;
  } catch (e) {
    return e;
  }
};

export default login;
