const gallery = async (root, { galleryID }, { db }) => {
  try {
    const [galleryInfo] = await db('gallery')
      .select()
      .where({ galleryID });

    return galleryInfo;
  } catch (err) {
    return err;
  }
};

export default gallery;
