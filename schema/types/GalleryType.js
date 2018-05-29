import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

const GalleryType = new GraphQLObjectType({
  name: 'gallery',
  fields: {
    galleryID: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    clickNumber: {
      type: GraphQLInt,
    },
    timeCreated: {
      type: GraphQLString,
    },
    photos: {
      type: GraphQLString, // TODO: make a PhotoType when it's created
    },
  },
});

export default GalleryType;

