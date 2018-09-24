import account from './account';
import galleries from './galleries';
import gallery from './gallery';
import getPhoto from './getPhoto';
import createAccount from './createAccount';
import login from './login';
import s3PreSignedURL from './s3PreSignedURL';
import addPhoto from './addPhoto';
import createGallery from './createGallery';
import deleteItem from './deleteItem';
import deletePhoto from './deletePhoto';

const Query = {
  account,
  galleries,
  gallery,
  getPhoto,
  login,
  s3PreSignedURL,
};

const Mutation = {
  createAccount,
  addPhoto,
  createGallery,
  deleteItem,
  deletePhoto,
};

// CREATE RESOLVERS FOR NESTED QUERIES
const Gallery = {
  photos: async ({ galleryID }, args, { db }) => {
    try {
      const photosInfo = await db('photo')
        .select()
        .where({ galleryID });

      return photosInfo;
    } catch (err) {
      return err;
    }
  },
};

export default {
  Query,
  Mutation,
  Gallery,
};
