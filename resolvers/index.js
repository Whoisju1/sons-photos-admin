import account from './account';
import galleries from './galleries';
import gallery from './gallery';
import photo from './photo';
import createAccount from './createAccount';

const Query = {
  account,
  galleries,
  gallery,
  photo,
};

const Mutation = {
  createAccount,
};

export default { Query, Mutation };
