import Busboy from 'busboy';
import AWS from 'aws-sdk';
import fs from 'fs';
import postgres from '../db/knex';

require('dotenv').config();

// get credentials for AWS
const { BUCKET_NAME } = process.env;
const { IAM_USER_KEY } = process.env;
const { IAM_USER_SECRETE } = process.env;

const uploadToS3 = async (file) => {
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
      if (err) return console.log(err);
      return console.log(data);
    });
  }).promise();
};

export const uploadFile = async (req, res) => {
  try {
    const busBoy = new Busboy({ headers: req.headers });
    busBoy.on('finish', () => console.log('Upload Completed')); // eslint-disable-line no-console
    const { id } = req.params;
    // get files from request object
    const { files: { photo } } = req;

    // save url to the photo table
    const { rows: [data] } = await postgres.raw(
      'INSERT INTO photo(url, gallery_id) VALUES(?, ?) RETURNING *;',
      ['filename', id],
    );

    console.log(data);

    return res.status(200).json('Upload complete');
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const uploadFiles = async (req, res) => {
  try {
    const { user: { sub } } = req;
    console.log('----------->>> ', { sub });
    const busBoy = new Busboy({ headers: req.headers });
    busBoy.on('finish', () => console.log('Upload Completed')); // eslint-disable-line no-console

    // grab file from request object
    const { file } = req;
    // uploadToS3(file);
    return res.status(200);
  } catch (err) {
    return res.status(500).json(err);
  }
};

