import { ResolverFn } from 'apollo-server-express';
import { generateToken } from '../services/userTokenGenerator';

const login: ResolverFn = async (root, { input: { username, password } }, { db, bcrypt }) => {
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
    const { id, role } = userInfo; // eslint-disable-line camelcase
    userInfo.token = generateToken({ id, role });

    // remove password from payload
    delete userInfo.password;

    return userInfo;
  } catch (e) {
    return e;
  }
};

export default login;
