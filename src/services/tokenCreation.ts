import jwt from 'jsonwebtoken';
import { JWT_SECRETE as secrete } from '../config';

export const generateToken = <T>(sub: T) => {
  return jwt.sign({ sub }, secrete);
};
