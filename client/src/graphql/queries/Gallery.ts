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

export const GET_CACHED_GALLERIES = gql`
  query GetCachedGalleries {
    getCachedGalleries @client {
      galleryID
      photos {
        url
        filename
        photoID
      }
    }
  }
`;
// CLIENT STUFF
export const CACHE_GALLERY = gql`
  mutation CacheGallery ($gallery: galleryInput) {
    cacheGallery (gallery: $gallery) @client {
      galleryID
      photos {
        url
        photoID
        filename
      }
    }
  }
`;

export const GALLERY_CACHE_SINGLE = gql`
  query GetOneGallery($galleryID: String) {
    getCachedGallery (galleryID: $galleryID) @client {
      galleryID
        photos {
          url
          photoID
          filename
        }
      }
    }
`;