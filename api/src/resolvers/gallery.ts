import { ResolverFn } from 'apollo-server-express';

const gallery: ResolverFn = async (root, { id }: { id: string } , { db }) => {
  try {
    const [galleryInfo] = await db('gallery')
      .select()
      .where({ id });

    return galleryInfo;
  } catch (err) {
    return err;
  }
};

export default gallery;
