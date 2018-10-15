import gql from 'graphql-tag';
import { PHOTO_FRAGMENT } from '../fragments';

export const GALLERY_QUERY = gql`
  query getGallery ($galleryID: ID) {
    gallery (galleryID: $galleryID) {
      galleryTitle
      galleryID
      photos {
        ...photos
      }
    }
  }
  ${PHOTO_FRAGMENT}
`;

export const GALLERIES_QUERY = gql`
query getGalleries ($sortBy: SortGalleryBy, $sortOrder: SortOrder) {
  galleries (sortBy: $sortBy, sortOrder: $sortOrder) {
    galleryID
    galleryTitle
  }
}
`;
