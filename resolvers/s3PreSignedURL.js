import AWS from 'aws-sdk';
import uuid from 'uuid/v1';

require('dotenv').config();

const { ACCESS_KEY_ID } = process.env;
const { SECRETE_ACCESS_KEY } = process.env;

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRETE_ACCESS_KEY,
});

const s3PreSignedURL = async (root, { input }) => {
  try {
    const { gallery, filename } = input;
    const key = `${gallery}/${uuid()}-${filename}`;

    const params = {
      Bucket: 'sons-photos-bucket',
      ContentType: 'image/jpeg',
      Key: key,
    };

    // s3.getSignedUrl('putObject', params, (err, url) => {
    //   if (err) return err.message;
    //   return { key, url };
    // });

    const url = s3.getSignedUrl('putObject', params);
    return { key, url };
  } catch (err) {
    return err.message;
  }
};

export default s3PreSignedURL;
