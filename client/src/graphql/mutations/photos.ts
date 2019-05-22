import { gql } from 'apollo-boost';

export const DELETE_PHOTO = gql`
  mutation DeletePhotos($photoIDs:[ID!]!) {
    deletePhotos(photoIDs:$photoIDs) {
      id
      url
      filename
    }
  }
`;