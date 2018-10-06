import gql from 'graphql-tag';

export const PHOTO_FRAGMENT = gql`
  fragment photos on Photo {
    url
    photoID
    filename
  }
`;