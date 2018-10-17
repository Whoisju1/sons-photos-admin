import { ResolverFn } from 'apollo-server-express';
const getPhoto: ResolverFn = async (root: any, { photoID }: { photoID: string }, { db }) => {
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
