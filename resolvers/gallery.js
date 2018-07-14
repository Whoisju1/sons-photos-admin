const gallery = async (root, { galleryID }, { db }) => {
  try {
    const [galleryInfo] = await db('gallery_view')
      .select()
      .where({ galleryID });

    return galleryInfo;
  } catch (err) {
    return err;
  }
};

export default gallery;
