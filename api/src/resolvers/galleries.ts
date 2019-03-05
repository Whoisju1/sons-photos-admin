import { ResolverFn } from 'apollo-server-express';

const galleries: ResolverFn = async (root: any, { orderBy = 'id', sortOrder = 'asc' }, { db }) => {
  try {
    const galleriesList = await db('gallery')
      .orderBy(orderBy, sortOrder);

    return galleriesList;
  } catch (err) {
    return err;
  }
};

export default galleries;
