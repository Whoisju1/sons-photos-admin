import { ApolloError } from 'apollo-server-express';
import Knex from 'knex';
import { QueryGetGalleryResolver, QueryGetGalleriesResolver } from '../../../resolver-types';

export const getGallery: QueryGetGalleryResolver<{}, {}, { db: Knex }>
  = async (root, { title }, { db }) => {
    try {
      const [galleryInfo] = await db('gallery')
        .select()
        .where({ title });

      if (!galleryInfo) return new ApolloError(`There is no gallery by the name of "${title}"`);

      return galleryInfo;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

export const getGalleries: QueryGetGalleriesResolver<{}, {}, { db: Knex }>
  = async (root, { sortBy, sortOrder }, { db }) => {
    try {
      const galleriesList = await db('gallery')
        .orderBy(sortBy || 'id', sortOrder || 'ASC');
      return galleriesList;
    } catch (err) {
      return err;
    }
  };
