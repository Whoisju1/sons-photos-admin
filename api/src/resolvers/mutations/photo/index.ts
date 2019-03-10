import {
  MutationAddPhotoResolver,
  Role,
  MutationDeletePhotoResolver,
} from '../../../resolver-types';
import Knex from 'knex';
import AWS from 'aws-sdk';
import * as config from '../../../config';

interface IUserInfo {
    sub: {
      id: string;
      role: Role;
    };
}

export const addPhoto: MutationAddPhotoResolver<{}, {}, { db: Knex, user: IUserInfo }>
= async (_, { input }, { db, user }) => {
  try {
    // store photo and retrieve the photo id
    // get user id from token
    const { id: accountID } = user.sub; // eslint-disable-line camelcase
    // add user id to data to be stored in database
    const newInput = { ...input, accountID };
    const [photo] = await db('photo')
      .insert(newInput)
      .returning('*');

    return photo;
  } catch (err) {
    return err;
  }
};

export const deletePhoto: MutationDeletePhotoResolver<{}, {}, { db: Knex }>
= async (
  _,
  { filenames },
  { db },
) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: config.ACCESS_KEY_ID,
      secretAccessKey: config.SECRETE_ACCESS_KEY,
    });

    const files = filenames.map(filename => ({ Key: filename })) as [{ Key: string }];

    const params = {
      Bucket: config.BUCKET_NAME,
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
