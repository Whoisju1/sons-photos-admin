import AWS from 'aws-sdk';
import uuid from 'uuid/v1';
import requireAuth from '../resolverMiddleware/requireAuth';
import { ResolverFn } from 'apollo-server-express';

require('dotenv').config();

const { ACCESS_KEY_ID } = process.env;
const { SECRETE_ACCESS_KEY } = process.env;

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRETE_ACCESS_KEY,
});

const s3PreSignedURL: ResolverFn = async (root, { filename }) => {
  try {
    filename = filename // eslint-disable-line no-param-reassign
      .toLowerCase()
      .replace(/ /gi, '_'); // replace all white-spaces with underscore

    const key = `${uuid()}-${filename}`;

    const params = {
      Bucket: 'sons-photos-bucket',
      ContentType: 'image/jpeg',
      Key: key,
    };

    const url = s3.getSignedUrl('putObject', params);
    return { key, url };
  } catch (err) {
    return err.message;
  }
};

export default requireAuth(s3PreSignedURL);
