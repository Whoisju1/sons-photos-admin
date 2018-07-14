const galleries = async (root, { orderBy = 'galleryID', sortOrder = 'asc' }, { db }) => {
  try {
    const galleriesList = await db('gallery_view')
      .orderBy(orderBy, sortOrder);

    return galleriesList;
  } catch (err) {
    return err;
  }
};

export default galleries;
