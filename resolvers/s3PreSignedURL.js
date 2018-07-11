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

    const url = s3.getSignedUrl('putObject', params);
    return { key, url };
  } catch (err) {
    return err.message;
  }
};

export default s3PreSignedURL;

// WHAT SHOULD HAPPEN ON THE FRONTEND
// const submitFile = async (values, file) => {
//   // this gets the pre-signed url from aws
//   const uploadConfig = await axios.get('/api/upload');
//   // destructure the url from aws
//   const { url } = uploadConfig.data;
//   // upload to file directly to aws S3
//   const upload = axios.put(url, file, {
//     headers: {
//       'Content-Type': file.type,
//     },
//   });

//   // send all the data along with the key returned
//   // from a successful upload to AWS for accessing the uploaded file
//   const res = await axios.post('/api/photo', {
//     ...values,
//     imageURL: uploadConfig.data.key,
//   });
// };
