import requireAuth from '../resolverMiddleware/requireAuth';

const addPhoto = async (root, { input }, { db, req }) => {
  try {
    /* ** store photo and retrieve the photo id ** */
    // get user id from token
    const { account_id } = req.user.sub; // eslint-disable-line camelcase
    // add user id to data to be stored in database
    const newInput = { ...input, account_id };
    const [photoID] = await db('photo')
      .insert(newInput)
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
