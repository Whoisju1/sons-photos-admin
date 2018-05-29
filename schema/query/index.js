import { GraphQLObjectType } from 'graphql';
import AccountType from '../types/AccountType';

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    account: {
      type: AccountType,
      resolve: () => null,
    },
  },
});

export default query;
