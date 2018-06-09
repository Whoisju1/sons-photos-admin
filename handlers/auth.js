import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import postgres from '../db/knex';

// gain access to environment variables in .env file
require('dotenv').config();

// get secret key for jwt
const secret = Buffer.from(process.env.JWT_SECRETE, 'base64');

export const signUp = async (req, res) => {
  try {
    // get data from req.body
    const { password } = req.body;
    // hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    // save user info to database
    const [userInfo] = await postgres('account')
      .insert(req.body)
      .returning(['first_name', 'last_name', 'username', 'account_id', 'email']);

    // create token and send it to the client
    const token = jwt.sign(userInfo, secret);
    return res.status(200).json(token);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

export const signIn = async (req, res) => {
  try {
    return res.status(200).json('sign in');
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

