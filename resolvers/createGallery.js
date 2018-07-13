const createGallery = async (root, { input }, { db, request }) => {
  try {
    const { user } = request;
    if (!user) return new Error('Please log in');
    const { account_id } = user.sub; // eslint-disable-line camelcase

    const [galleryID] = await db('gallery')
      .insert(input)
      .where({ account_id })
      .returning('gallery_id');

    const [gallery] = await db('gallery_view')
      .select()
      .where({ galleryID });

    return gallery;
  } catch (err) {
    return err;
  }
};

export default createGallery;
