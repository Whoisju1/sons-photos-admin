import { GraphQLObjectType } from 'graphql';
import { AccountType, CompanyType } from '../types';

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
  },
});

export default query;
