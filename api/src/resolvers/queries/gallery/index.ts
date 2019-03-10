import Knex from 'knex';
import { ResolverFn } from 'apollo-server-express';
import { QueryGetGalleryResolver, QueryGetGalleriesResolver } from '../../../resolver-types';

export const getGallery: QueryGetGalleryResolver<{}, {}, { db: Knex }>
= async (root, { id }, { db }) => {
  try {
    const [galleryInfo] = await db('gallery')
      .select()
      .where({ id });

    return galleryInfo;
  } catch (err) {
    return err;
  }
};

export const getGalleries: QueryGetGalleriesResolver<{}, {}, { db: Knex }>
= async (root: any, { sortBy, sortOrder }, { db }) => {
  try {
    const galleriesList = await db('gallery')
      .orderBy(sortOrder || 'asc', sortBy || 'id');

    return galleriesList;
  } catch (err) {
    return err;
  }
};
