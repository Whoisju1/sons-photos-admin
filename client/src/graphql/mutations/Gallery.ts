import gql from 'graphql-tag';

export const CREATE_GALLERY_MUTATION = gql`
mutation createGallery($galleryInfo: createGalleryInput!) {
  createGallery (input: $galleryInfo) {
    galleryID
    title
    description
    clickCount
    createdAt
  }
}
`;
