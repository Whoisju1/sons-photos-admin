import { ResolverFn } from 'apollo-server-express';

const Gallery: { photos: ResolverFn } = {
  photos: async ({ galleryID }: { galleryID: string }, args: any, { db }) => {
    try {
      const photosInfo = await db('photo')
        .select()
        .where({ galleryID });

      return photosInfo;
    } catch (err) {
      return err;
    }
  },
};

export default Gallery;
