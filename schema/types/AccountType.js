import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

const AccountType = new GraphQLObjectType({
  name: 'account',
  fields: {
    accountID: {
      type: GraphQLNonNull(GraphQLID),
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    userName: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLInt,
    },
    password: {
      type: GraphQLString,
    },
    timeCreated: {
      type: GraphQLString,
    },
    company: {
      type: GraphQLString, // TODO: make a type for it
    },
  },
});

export default AccountType;
