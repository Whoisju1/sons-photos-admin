import { ResolverFn } from 'apollo-server-express';
const getPhoto: ResolverFn = async (root: any, { id }: { id: string }, { db }) => {
  try {
    const [photo] = await db
      .select()
      .where({ id })
      .from('photo');

    return photo;
  } catch (err) {
    return err;
  }
};

export default getPhoto;
