import requireAuth from '../resolverMiddleware/requireAuth';

const createGallery = async (root, { input }, { db, req }) => {
  try {
    const { user } = req;
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

export default requireAuth(createGallery);
