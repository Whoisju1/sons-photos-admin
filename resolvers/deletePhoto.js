/* eslint-disable camelcase */
const deletePhoto = async (root, { photo_id }, { db, request: { user } }) => {
  try {
    if (!user) return new Error('Please sign in');
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

export default deletePhoto;
