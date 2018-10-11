export default `
  input photoInput {
    url: String
    filename: String
    photoID: String
  }

  input galleryInput {
    galleryID: String
    photos: [photoInput]
  }

  type Photo {
    url: String
    filename: String
    photoID: String
  }

  type Gallery {
    galleryID: String
    photos: [Photo]
  }

  type Mutation {
    cacheGallery (gallery: galleryInput): [Gallery]
  }

  type Query {
    getCachedGalleries(gallery: galleryInput): [Gallery]
  }
`;