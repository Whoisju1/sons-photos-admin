const uploadPhoto = async (root, { input }, { db, request }) => {
  try {
    const { user = null } = request;
    // throw return an error if user is not signed in
    if (!user) return new Error('Please sign in');

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

export default uploadPhoto;
