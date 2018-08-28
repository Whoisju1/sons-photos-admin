import requireAuth from '../resolverMiddleware/requireAuth';

const addPhoto = async (root, { input }, { db, req }) => {
  try {
    /* ** store photo and retrieve the photo id ** */
    // get user id from token
    const { accountID } = req.user.sub; // eslint-disable-line camelcase
    // add user id to data to be stored in database
    const newInput = { ...input, accountID };
    const [photo] = await db('photo')
      .insert(newInput)
      .returning('*');

    return photo;
  } catch (err) {
    return err;
  }
};

export default requireAuth(addPhoto);
