import jwt from 'jsonwebtoken';
import { JWT_SECRETE as secrete } from '../config';

export const generateToken = <T>(sub: T) => {
  console.log({ sub });
  const token: string = jwt.sign({ sub }, secrete);
  return token;
};
