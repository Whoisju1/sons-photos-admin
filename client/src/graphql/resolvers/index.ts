import { InMemoryCache } from 'apollo-cache-inmemory';

export interface IPhoto {
  url: string;
  filename: string;
  photoID: string;
  __typename: string;
}

export default {
  Mutation: {
    storeGallery: (
      _: any,
      { photos, galleryID }: { photos : string, galleryID: IPhoto[] },
      { cache }: { cache: InMemoryCache }
    ) => {
      console.log(photos);
      console.log(galleryID);
      console.log(cache);
      return null;
    }
  }
}