const getPhoto = async (root, { photoID }, { db }) => {
  try {
    const [photo] = await db
      .select()
      .where({ photoID })
      .from('photo');

    return photo;
  } catch (err) {
    return err;
  }
};

export default getPhoto;
