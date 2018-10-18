import { ResolverFn } from 'apollo-server-express';

const gallery: ResolverFn = async (root, { galleryID }: { galleryID: string } , { db }) => {
  try {
    const [galleryInfo] = await db('gallery')
      .select()
      .where({ galleryID });

    return galleryInfo;
  } catch (err) {
    return err;
  }
};

export default gallery;
