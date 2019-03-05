import { ResolverFn } from 'apollo-server-express';
import AWS from 'aws-sdk';
import * as config from '../config';

const deleteGallery: ResolverFn = async (
  _,
  { id }: { id: string },
  { db }: { db: any},
) => {
  try {
  // check to see how many photos are in specified gallery
  const [photoQuantity] = await db('photo')
  .where({ id })
  .count();
  const photoCount: number = parseInt(photoQuantity.count, 10);

  // if there are photos delete all from S3
  if (photoCount) {
  // get photoIDs
  const photos: Array<{ filename: string }> = await db.select('filename')
    .from('photo')
    .where({ id });
  const filenames = photos.map(({ filename }) => filename);

  const s3 = new AWS.S3({
      accessKeyId: config.ACCESS_KEY_ID,
      secretAccessKey: config.SECRETE_ACCESS_KEY,
    });

  const files = filenames.map(filename => ({ Key: filename }));

  const params = {
      Bucket: config.BUCKET_NAME,
      Delete: {
        Objects: files,
      },
    };

  const { Deleted } = await s3
      .deleteObjects(params)
      .promise();

  if (Deleted && !!Deleted.length) {
        // delete all photos from the database that have the specified gallery id
    await Deleted.map(({ Key: filename }) => db('photo')
        .where({ filename })
        .del()
        .returning('photoID'));
  }
}
// delete the gallery for the corresponding id
  const [foundID]: string[] = await db('gallery')
  .where({ id })
  .del()
  .returning('id');
// throw an error if the gallery doesn't exist
  if (!foundID) return new Error('Gallery does not exist');
// return the gallery ID
  return { id: foundID };
  } catch (e) {
    return e;
  }
};

export default deleteGallery;
