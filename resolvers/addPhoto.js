import requireAuth from '../resolverMiddleware/requireAuth';

const addPhoto = async (root, { input }, { db }) => {
  try {
    // store photo and retrieve the photo id
    const [photoID] = await db('photo')
      .insert(input)
      .returning('photo_id');

    // fetch photo from photo_view
    const [photo] = await db('photo_view')
      .select()
      .where({ photoID });

    return photo;
  } catch (err) {
    return err;
  }
};

export default requireAuth(addPhoto);
