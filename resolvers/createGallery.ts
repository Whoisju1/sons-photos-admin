import requireAuth from '../resolverMiddleware/requireAuth';
import { ResolverFn } from 'apollo-server-express';

const createGallery: ResolverFn = async (root, { input }, { db, req }) => {
  try {
    const { accountID } = req.user.sub; // eslint-disable-line camelcase

    const [gallery] = await db('gallery')
      .insert({ ...input, accountID })
      .where({ accountID })
      .returning('*');

    return gallery;
  } catch (err) {
    return err;
  }
};

export default requireAuth(createGallery);
