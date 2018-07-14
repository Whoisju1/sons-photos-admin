import requireAuth from '../resolverMiddleware/requireAuth';

/* eslint-disable camelcase */
const deletePhoto = async (root, { photo_id }, { db }) => {
  try {
    const res = await db('photo')
      .where({ photo_id })
      .del()
      .returning('*');

    console.log(res);
    return null;
  } catch (err) {
    return err;
  }
};

export default requireAuth(deletePhoto);
