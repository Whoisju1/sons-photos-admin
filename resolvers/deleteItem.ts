import requireAuth from '../resolverMiddleware/requireAuth';
import { ResolverFn } from 'apollo-server-express';

/* eslint-disable camelcase */
const deleteItem: ResolverFn = async (root, { item, ID }, { db }) => {
  try {
    const itemID = `${item}_id`;

    const quantityDeleted = await db(item)
      .where({ [itemID]: ID })
      .del();

    return { quantityDeleted };
  } catch (err) {
    return err;
  }
};

export default requireAuth(deleteItem);
