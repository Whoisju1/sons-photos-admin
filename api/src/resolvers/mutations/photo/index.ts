import {
  MutationAddPhotosResolver,
  Role,
  MutationDeletePhotosResolver,
} from '../../../resolver-types';
import Knex from 'knex';
import AWS from 'aws-sdk';
import * as config from '../../../config';
import { ApolloError } from 'apollo-server-express';

interface IUserInfo {
  sub: {
    id: string;
    role: Role;
  };
}

export const addPhotos: MutationAddPhotosResolver<{}, {}, { db: Knex, user: IUserInfo }>
  = async (_, { input, galleryTitle }, { db, user }) => {
    try {
      // store photo and retrieve the photo id
      // get user id from token
      const { id: accountID } = user.sub;
      // add user id to data to be stored in database

      // get gallery Id from database
      const [{ id: galleryID }] = await db('gallery')
        .select('id')
        .where({ title: galleryTitle });

      const newInput = input.map(item => ({ ...item, accountID, galleryID }));

      const photosToSave = newInput.map(async photoInput => {
        const [savedPhotos] = await db('photo')
          .insert(photoInput)
          .returning('*');
        return savedPhotos;
      });

      return await Promise.all(photosToSave);
    } catch (err) {
      return err;
    }
  };

export const deletePhotos: MutationDeletePhotosResolver<{}, {}, { db: Knex }>
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

      if (!Deleted) return new ApolloError('Photo does not exist.');

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
