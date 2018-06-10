import account from './account';
import galleries from './galleries';
import gallery from './gallery';
import photo from './photo';
import createAccount from './createAccount';
import login from './login';

const Query = {
  account,
  galleries,
  gallery,
  photo,
  login,
};

const Mutation = {
  createAccount,
};

export default { Query, Mutation };
