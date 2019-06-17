import AWS from 'aws-sdk';
import uuid from 'uuid/v1';
import * as config from '../config';
import { ApolloError } from 'apollo-server-express';

const s3 = new AWS.S3({
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRETE_ACCESS_KEY,
});

export default async (filename: string) => {
  try {
    filename = filename // eslint-disable-line no-param-reassign
    .toLowerCase()
    .replace(/ /gi, '-'); // replace all white-spaces with underscore

  // get file type from filename
    const isFileTypeValid = /(?<type>(jpeg|jpg|png)$)/.test(filename);
    if (!isFileTypeValid)  {
    throw new ApolloError(
      'only images of types "jpeg", "jpg" and "png" are permitted.',
      'unsupported media type');
  }
    let ContentType = 'image/jpeg';

  // test to determine if the file is a png file
    const isPng = /.png$/.test(filename);
  // tslint:disable-next-line: no-unused-expression
    isPng && (ContentType = 'image/png');

    const key = `${uuid()}-${filename}`;

    const params = {
    Bucket: 'sons-photos-bucket',
    ContentType,
    Key: key,
  };

    const url = await s3.getSignedUrl('putObject', params);
    return {
    key,
    url,
  };
  } catch (error) {
    throw new ApolloError(error);
  }
};
