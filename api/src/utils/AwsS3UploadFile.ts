import AWS from 'aws-sdk';
import uuid from 'uuid/v1';
import * as config from '../config';
import { S3PreSignedUrl } from '../resolver-types';

const s3 = new AWS.S3({
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRETE_ACCESS_KEY,
});

export default async (filename: string): Promise<S3PreSignedUrl> => {
  filename = filename // eslint-disable-line no-param-reassign
      .toLowerCase()
      .replace(/ /gi, '_'); // replace all white-spaces with underscore

  const key = `${uuid()}-${filename}`;

  const params = {
    Bucket: 'sons-photos-bucket',
    ContentType: 'image/jpeg',
    Key: key,
  };

  const url = await s3.getSignedUrl('putObject', params);

  return {
    key,
    url,
  };
};
