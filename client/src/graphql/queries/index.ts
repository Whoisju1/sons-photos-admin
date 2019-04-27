import gql from 'graphql-tag';

export const GET_ACCOUNT = gql`
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

export const GALLERY_QUERY = gql`
  query GetGalleries {
    getGalleries {
      id
      title
      description
    }
  }
`;