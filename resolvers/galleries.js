const galleries = async (root, args, { db }) => {
  try {
    const galleriesList = await db('gallery_view')
      .select();

    return galleriesList;
  } catch (err) {
    return err;
  }
};

export default galleries;
