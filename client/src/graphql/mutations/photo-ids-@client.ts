import gql from 'graphql-tag';

export const PHOTO_ID_CLIENT_MUTATION = gql`
  mutation AddPhotoIDs ($galleryID: ID, $ids: [String]) {
    addPhotoIDs (galleryID: $galleryID, ids: $ids) @client {
      PhotoCacheID {
        photoIDs
        galleryIDs
      }
    }
  } 
`;
