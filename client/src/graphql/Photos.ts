import gql from 'graphql-tag';

export const SAVE_PHOTO_INFO = gql`
  mutation SavePhotoInfo ($galleryTitle: String!, $photoInfo: [AddPhotoInput!]!) {
    addPhotos(galleryTitle: $galleryTitle, input: $photoInfo) {
      id
      url
      description
      filename
    }
  }
`;

export const GET_SIGNED_URL = gql`
    query GetPresignedUrls ($filenames:[String!]!) {
    s3PreSignedURLs(filenames:$filenames) {
        url
        key
    }
    }
`;