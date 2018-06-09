// import db from '../db/knex';
import bcrypt from 'bcrypt';
// import postgres from '../db/knex';

export const signUp = async (req, res) => {
  try {
    // get data from req.body
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    return res.status(200).json(req.body);
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

