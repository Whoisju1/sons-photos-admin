import { JWT_SECRETE as secrete } from '../config';
import { Role } from '../typeDefs';
import jwt from 'jsonwebtoken';

interface IUserInfo {
  accountID: number;
  role: Role;
}

export const generateToken = (sub: IUserInfo) => {
  console.log({ sub });
  const token = jwt.sign({ sub }, secrete);
  console.log({ token });
  console.log({ decoded: jwt.decode(token)} );
  return token;
};
