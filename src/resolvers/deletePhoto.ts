import AWS from 'aws-sdk';
import requireAuth from '../resolverMiddleware/requireAuth';
import { ResolverFn } from 'apollo-server-express';

const { ACCESS_KEY_ID } = process.env;
const { BUCKET_NAME } = process.env;
const { SECRETE_ACCESS_KEY } = process.env;

const deletePhoto: ResolverFn = async (
  root: any,
  { filenames }: { filenames: string[] }, // eslint-disable-line camelcase
  { db },
) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRETE_ACCESS_KEY,
    });

    const files = filenames.map(filename => ({ Key: filename }));

    const params = {
      Bucket: (BUCKET_NAME as string),
      Delete: {
        Objects: files,
      },
    };

    const { Deleted } = await s3
      .deleteObjects(params)
      .promise();

    if (!Deleted) return new Error('Photo does not exist.');

    const deletedPhotos = await Deleted.map(({ Key: filename }) => db('photo')
      .where({ filename })
      .del()
      .returning('*'));

    const [results] = await Promise.all(deletedPhotos);

    return results;
  } catch (err) {
    return err;
  }
};

export default requireAuth(deletePhoto);