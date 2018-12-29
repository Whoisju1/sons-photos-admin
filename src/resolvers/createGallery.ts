import { ResolverFn } from 'apollo-server-express';

const createGallery: ResolverFn = async (root, { input }, { db, user }) => {
  try {
    const { accountID } = user.sub;

    const [gallery] = await db('gallery')
      .insert({ ...input, accountID })
      .where({ accountID })
      .returning('*');

    return gallery;
  } catch (err) {
    return err;
  }
};

export default createGallery;
