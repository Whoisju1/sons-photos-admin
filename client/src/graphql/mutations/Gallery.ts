import gql from 'graphql-tag';

export const CREATE_GALLERY_MUTATION = gql`
mutation createGallery($galleryInfo: createGalleryInput) {
  createGallery (input: $galleryInfo) {
    galleryID
    galleryTitle
    description
    clickCount
    createdAt
  }
}
`;

// CLIENT STORE
export const CACHE_GALLERY = gql`
  mutation CacheGallery ($gallery: galleryInput) {
    cacheGallery(gallery: $gallery) @client {
      galleryID
      photos {
        url
        filename
        photoID
      }
    }
  }
`;