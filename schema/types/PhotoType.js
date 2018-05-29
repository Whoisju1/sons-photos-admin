import {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLObjectType,
} from 'graphql';
import { GalleryType } from '.';

const PhotoType = new GraphQLObjectType({
  name: 'photos',
  fields: {
    photoID: {
      type: GraphQLID,
    },
    url: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    gallery: {
      type: GalleryType,
    },
    clickNumber: {
      type: GraphQLInt,
    },
    dateCreated: {
      type: GraphQLString,
    },
  },
});

export default PhotoType;
