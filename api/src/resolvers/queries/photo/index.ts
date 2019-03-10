import { QueryGetPhotoResolver } from '../../../resolver-types';
import Knex from 'knex';

export const getPhoto: QueryGetPhotoResolver<{}, {}, { db: Knex }> = async (root: any, { id }, { db }) => {
  try {
    const [photo] = await db
      .select()
      .where({ id })
      .from('photo');

    return photo;
  } catch (err) {
    return err;
  }
};
