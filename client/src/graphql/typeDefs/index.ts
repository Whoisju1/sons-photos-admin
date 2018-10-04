export default `
  type PhotoCacheID {
    galleryID: ID
    photoIDs: [String]
  }

  type Query {
    getPhotoIDs (galleryID: ID): PhotoCacheID
  }

  type Mutation {
    addPhotoID (galleryID: ID, ids: [String]): PhotoCacheID
  }
`;