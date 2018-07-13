const gallery = async (root, { galleryID }, { db, request: { user = null } }) => {
  try {
    if (!user) return new Error('Please sign in');
    const [galleryInfo] = await db('gallery_view')
      .select()
      .where({ galleryID });

    return galleryInfo;
  } catch (err) {
    return err;
  }
};

export default gallery;
