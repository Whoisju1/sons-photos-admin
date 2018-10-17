import account from './account';
import addPhoto from './addPhoto';
import createAccount from './createAccount';
import createGallery from './createGallery';
import deleteItem from './deleteItem';
import deletePhoto from './deletePhoto';
import galleries from './galleries';
import gallery from './gallery';
import getPhoto from './getPhoto';
import login from './login';
import s3PreSignedURL from './s3PreSignedURL';

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

const Photo = {
  gallery: async ({ galleryID }, args, { db }) => {
    try {
      const [foundGallery] = await db('gallery')
        .select()
        .where({ galleryID });

      return foundGallery;
    } catch (error) {
      return error;
    }
  },
};

export default {
  Query,
  Mutation,
  Gallery,
  Photo,
};
