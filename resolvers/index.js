import account from './account';
import galleries from './galleries';
import gallery from './gallery';
import photo from './photo';
import createAccount from './createAccount';
import login from './login';
import s3PreSignedURL from './s3PreSignedURL';
import uploadPhoto from './uploadPhoto';
import createGallery from './createGallery';
import createCompany from './createCompany';

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
  uploadPhoto,
  createGallery,
  createCompany,
};

export default { Query, Mutation };
