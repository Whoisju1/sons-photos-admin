import {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
  GraphQLInt,
} from 'graphql';

const CompanyType = new GraphQLObjectType({
  name: 'company',
  fields: {
    companyID: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    logo: {
      type: GraphQLString,
    },
    motto: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLInt,
    },
    description: {
      type: GraphQLString,
    },
  },
});

export default CompanyType;
