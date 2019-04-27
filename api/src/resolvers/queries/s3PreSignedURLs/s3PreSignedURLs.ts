import { ApolloError } from 'apollo-server-express';
import awsS3UploadFile from '../../../utils/AwsS3UploadFile';

export const s3PreSignedURLs = async (root: any, { filenames }: { filenames: string[] }) => {
  console.log('attempted upload');
  try {
    return await Promise.all(filenames.map(filename => awsS3UploadFile(filename)));
  } catch (err) {
    throw new ApolloError(err);
  }
};

export default s3PreSignedURLs;
