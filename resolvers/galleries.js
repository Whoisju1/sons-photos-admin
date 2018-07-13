const galleries = async (root, args, { db, request }) => {
  try {
    if (!request.user) return new Error('Please sign in');
    const galleriesList = await db('gallery_view')
      .select();

    return galleriesList;
  } catch (err) {
    return err;
  }
};

export default galleries;
