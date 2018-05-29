import { GraphQLObjectType, GraphQLList } from 'graphql';
import { AccountType, CompanyType, GalleryType, PhotoType } from '../types';

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    account: {
      type: AccountType,
      resolve: () => null,
    },
    company: {
      type: CompanyType,
      resolve: () => null,
    },
    galleries: {
      type: GraphQLList(GalleryType),
      resolve: () => null,
    },
    photos: {
      type: GraphQLList(PhotoType),
      resolve: () => null,
    },
  },
});

export default query;
