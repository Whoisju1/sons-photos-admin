import { InMemoryCache } from 'apollo-cache-inmemory';

export default {
  Mutation: {
    addPhotoIDs: async (
      _: any,
      { ids, galleryID }: { ids : string, galleryID: string[] },
      { cache }: { cache: InMemoryCache }) => {
        console.log({ cache });
        console.log({ ids });
        console.log({ galleryID });
        
      // const { getPhotoIDs: { ids } } = cache.readQuery({
      //   query: 
      // });

      // combine cached photoIDs with a new one
      return null;
    },
    removePhotoID: () => {
      // ...
    },
  },
  Query: {
    getPhotoIDs: () => {
      return null;
    },
    getAllPhotoIDs: () => {
      console.log('inside getAllPhotoIDs');
      return null;
    }
  }
}