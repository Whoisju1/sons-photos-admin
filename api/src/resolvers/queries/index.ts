import * as account from './account';
import * as gallery from './gallery';
import * as photo from './photo';
import * as s3PreSignedURLs from './s3PreSignedURLs';

export default {
  ...account,
  ...gallery,
  ...photo,
  ...s3PreSignedURLs,
};
