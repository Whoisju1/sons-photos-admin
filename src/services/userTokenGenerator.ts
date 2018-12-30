import { JWT_SECRETE as secrete } from '../config';
import { Role } from '../typeDefs';
import jwt from 'jsonwebtoken';

interface IUserInfo {
  accountID: number;
  role: Role;
}

export const generateToken = (sub: IUserInfo) => {
  const token = jwt.sign({ sub }, secrete);
  return token;
};
