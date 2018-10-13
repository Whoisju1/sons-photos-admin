import { InMemoryCache } from 'apollo-cache-inmemory';
import { GALLERY_CACHE_SINGLE, GET_CACHED_GALLERIES } from '../queries/Gallery';

export interface IPhoto {
  url: string;
  filename: string;
  photoID: string;
  __typename: string;
}

export interface IGalleryData {
  galleryID: string;
  galleryTitle: string;
  photos: IPhoto[];
  __typename: string;
}

export default {
  Mutation: {
    cacheGallery: (
      _: any,
      { gallery: {
        galleryTitle,
        galleryID,
        photos,
      } }: { gallery: IGalleryData },
      { cache }: { cache: InMemoryCache }
    ) => {
      // get preexisting data -- All Galleries
      const { getCachedGalleries: allGalleries }: { getCachedGalleries: IGalleryData[] } = cache.readQuery({
        query: GET_CACHED_GALLERIES,
      });
      // find relevant gallery
      const relevantGallery: IGalleryData = allGalleries.find(item => item.galleryID === galleryID) ||
      {
        galleryID,
        galleryTitle,
        photos: [],
        __typename: 'Gallery'
      };
      // combine initial and new Photos
      const combinedPhotos = [...relevantGallery.photos, ...photos]
      .reduce((photosCollection: IPhoto[], currentPhoto: IPhoto) => {
        if (!photosCollection.some(({ photoID }) => photoID === currentPhoto.photoID)) {
          photosCollection.push(currentPhoto);
        }
        return photosCollection;
      }, []);

      relevantGallery.photos = combinedPhotos;
      // write updated data to cache
      cache.writeQuery({
        query: GET_CACHED_GALLERIES,
        data: { getCachedGalleries: [...allGalleries, relevantGallery] },
      });
      // write to GALLERY_CACHE_SINGLE query
      cache.writeQuery({
        query: GALLERY_CACHE_SINGLE,
        data: { getCachedGallery: relevantGallery },
      });
      // return updated data
      return relevantGallery;
    }
  },
  Query: {
    getCachedGallery: (
      _: any,
      { galleryID }: { galleryID: string },
      { cache }: { cache: InMemoryCache }) => {
        // all galleries
        const { getCachedGalleries: data }: { getCachedGalleries: IGalleryData[] } = cache.readQuery({
          query: GET_CACHED_GALLERIES,
        });
        // find gallery for matching galleryID
        const gallery = data.find(item => item.galleryID === galleryID) ||
        {
          galleryID,
          photos: [],
          __typename: 'Gallery'
        };;
      return { getCachedGallery : gallery };
    }
  }
}