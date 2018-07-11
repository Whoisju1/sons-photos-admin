import account from './account';
import galleries from './galleries';
import gallery from './gallery';
import photo from './photo';
import createAccount from './createAccount';
import login from './login';
import s3PreSignedURL from './s3PreSignedURL';

const Query = {
  account,
  galleries,
  gallery,
  photo,
  login,
  s3PreSignedURL,
};

const Mutation = {
  createAccount,
};

export default { Query, Mutation };
