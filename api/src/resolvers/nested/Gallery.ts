import Knex from 'knex';

import {
  GalleryResolvers,
  Photo,
} from '../../resolver-types';

interface IContext {
  db: Knex;
}

const Gallery: GalleryResolvers<IContext> = {
  photos: async ({ id: galleryID }, args, { db }) => {
    try {
      const photosInfo = await db('photo')
        .select()
        .where({ galleryID });

      return photosInfo as Photo[];
    } catch (err) {
      return err;
    }
  },
};

export default Gallery;
