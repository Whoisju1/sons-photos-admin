require('dotenv').config();

interface IProcessEnv {
  [x: string]: string;
}

const {
  PORT,
  JWT_SECRETE,
  BUCKET_NAME,
  ACCESS_KEY_ID,
  SECRETE_ACCESS_KEY,
  EMAIL_CONNECTION_STRING,
  EMAIL_FROM,

} = process.env as IProcessEnv;

export {
  PORT,
  JWT_SECRETE,
  BUCKET_NAME,
  ACCESS_KEY_ID,
  SECRETE_ACCESS_KEY,
  EMAIL_CONNECTION_STRING,
  EMAIL_FROM,
};
