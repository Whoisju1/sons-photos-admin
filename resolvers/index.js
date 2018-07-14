import account from './account';
import galleries from './galleries';
import gallery from './gallery';
import photo from './photo';
import createAccount from './createAccount';
import login from './login';
import s3PreSignedURL from './s3PreSignedURL';
import addPhoto from './addPhoto';
import createGallery from './createGallery';
import createCompany from './createCompany';
import deleteItem from './deleteItem';

const Query = {
  account,
  galleries,
  gallery,
  photo,
  login,
  s3PreSignedURL,
};

const Mutation = {
  createAccount,
  addPhoto,
  createGallery,
  createCompany,
  deleteItem,
};

// CREATE RESOLVERS FOR NESTED QUERIES
const Gallery = {
  photos: async ({ galleryID }, args, { db }) => {
    try {
      const photosInfo = await db('photo_view')
        .select()
        .where({ galleryID });

      return photosInfo;
    } catch (err) {
      return err;
    }
  },
};

const Account = {
  company: async ({ accountID }, args, { db }) => {
    try {
      const company = await db('company_view')
        .select()
        .where({ accountID });

      return company;
    } catch (err) {
      return err;
    }
  },
};

const Company = {
  galleries: async ({ companyID }, args, { db }) => {
    try {
      const galleriesInfo = await db('gallery_view')
        .select()
        .where({ companyID });

      return galleriesInfo;
    } catch (err) {
      return err;
    }
  },
};

export default {
  Query,
  Mutation,
  Gallery,
  Account,
  Company,
};
