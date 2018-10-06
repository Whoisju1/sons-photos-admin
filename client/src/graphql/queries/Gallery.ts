import gql from 'graphql-tag';
import { PHOTO_FRAGMENT } from '../fragments/photos';

export const GALLERY_QUERY = gql`
  query getGallery {
    gallery (galleryID: 2) {
      galleryID
      photos {
        ...photos
      }
    }
  }
  ${PHOTO_FRAGMENT}
`;
