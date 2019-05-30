import gql from 'graphql-tag';

export const GET_ACCOUNT_QUERY = gql`
  query GetAccountInfo {
    getAccount {
      id
      firstName
      lastName
      email
      phone
      username
      role
    }
  }
`;

export const GET_GALLERIES_QUERY = gql`
  query GetGalleries {
    galleries: getGalleries {
      id
      title
      description
      photoQuantity
    }
  }
`;
