import { ApolloError } from 'apollo-server-express';
import awsS3UploadFile from '../../../utils/AwsS3UploadFile';

export const s3PreSignedURLs = async (root: any, { filenames }: { filenames: string[] }) => {
  try {
    const keysAndUrls = await Promise.all(filenames.map(filename => awsS3UploadFile(filename)));
    return keysAndUrls;
  } catch (err) {
    throw new ApolloError(err);
  }
};

export default s3PreSignedURLs;
