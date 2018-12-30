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
import deleteGallery from './deleteGallery';
import changePassword from './changePassword';
import editOwnAccount from './editOwnAccount';
// import { sendEmail } from './sendEmail';
import { ResolverFn, IResolvers } from 'apollo-server';

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
  changePassword,
  editOwnAccount,
  // sendEmail,
  addPhoto,
  createGallery,
  deleteItem,
  deletePhoto,
  deleteGallery,
};

// CREATE RESOLVERS FOR NESTED QUERIES
const Gallery: { photos: ResolverFn } = {
  photos: async ({ galleryID }: { galleryID: string }, args: any, { db }) => {
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

const Photo: { gallery: ResolverFn } = {
  gallery: async ({ galleryID }: { galleryID: string }, args: any, { db }) => {
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
} as IResolvers;
