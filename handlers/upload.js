import Busboy from 'busboy';
import AWS from 'aws-sdk';

require('dotenv').config();

// get credentials for AWS
const { BUCKET_NAME } = process.env;
const { IAM_USER_KEY } = process.env;
const { IAM_USER_SECRETE } = process.env;

const uploadToS3 = (file) => {
  const s3Bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRETE,
    Bucket: BUCKET_NAME,
  });

  s3Bucket.createBucket(() => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data,
    };

    s3Bucket.upload(params, (err, data) => {
      if (err) return console.log('AWS Error ===> ', err);
      console.log('data ==> ', data);
      return console.log('success');
    });
  }).promise();
};

export const uploadFile = async (req, res) => {
  try {
    const busBoy = new Busboy({ headers: req.headers });
    busBoy.on('finish', () => console.log('Upload Completed')); // eslint-disable-line no-console

    // get files from request object
    const { files: { photo } } = req;
    uploadToS3(photo);

    return res.status(200).json('Upload complete');
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const uploadFiles = async (req, res) => {
  try {
    const busBoy = new Busboy({ headers: req.headers });
    busBoy.on('finish', () => console.log('Upload Completed')); // eslint-disable-line no-console

    // grab file from request object
    const { file } = req;
    uploadToS3(file);
    return res.status(200);
  } catch (err) {
    return res.status(500).json(err);
  }
};

