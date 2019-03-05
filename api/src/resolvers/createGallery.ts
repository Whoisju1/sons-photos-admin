import { ResolverFn } from 'apollo-server-express';

const createGallery: ResolverFn = async (root, { input }, { db, user }) => {
  try {
    const { id } = user.sub;

    const [gallery] = await db('gallery')
      .insert({ ...input, accountID: id })
      .where({ id })
      .returning('*');

    return gallery;
  } catch (err) {
    return err;
  }
};

export default createGallery;
