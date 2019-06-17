import { ApolloError } from 'apollo-server-express';
import awsS3UploadFile from '../../../utils/AwsS3UploadFile';
import { QueryS3PreSignedUrLsResolver } from '../../../resolver-types';

export const s3PreSignedURLs: QueryS3PreSignedUrLsResolver = async (root, { filenames }) => {
  try {
    // array of promises which resolves to a key and url each
    const getKeysAndUrls = filenames.map(filename => awsS3UploadFile(filename));
    const keysAndUrls = await Promise.all(getKeysAndUrls);
    return keysAndUrls;
  } catch (err) {
    throw new ApolloError(err);
  }
};

export default s3PreSignedURLs;
