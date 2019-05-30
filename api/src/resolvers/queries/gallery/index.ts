import { ApolloError } from 'apollo-server-express';
import Knex from 'knex';
import { QueryGetGalleryResolver, QueryGetGalleriesResolver, Gallery } from '../../../resolver-types';

export const getGallery: QueryGetGalleryResolver<{}, {}, { db: Knex }>
  = async (root, { title }, { db }) => {
    try {
      const [galleryInfo] = await db('gallery')
        .select()
        .where({ title });

      const [photoInfo] = await db('photo')
        .count()
        .where({ galleryID: galleryInfo.id });

      if (!galleryInfo) return new ApolloError(`There is no gallery by the name of "${title}"`);
      return { ...galleryInfo, photoQuantity: photoInfo.count };
    } catch (err) {
      return err;
    }
  };

export const getGalleries: QueryGetGalleriesResolver<{}, {}, { db: Knex }>
  = async (root, { sortBy, sortOrder }, { db }) => {
    try {
      const galleriesList = await db('gallery')
        .orderBy(sortBy || 'id', sortOrder || 'ASC');
      const galleries = galleriesList.map(async (gallery: Gallery) => {
        const [count] = await db('photo')
          .count()
          .where({ galleryID: gallery.id });
        return { ...gallery, photoQuantity: count.count };
      });
      return Promise.all(galleries);
    } catch (err) {
      return err;
    }
  };
