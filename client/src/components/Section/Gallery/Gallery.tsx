import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import Photo from '../../Photo';
// import styled from '../../styled-components';

const GALLERY_QUERY = gql`
  query getGallery ($galleryID: Int) {
    gallery (galleryID: $galleryID) {
      title
      photos {
        url
        photoID
      }
    }
  }
`;

interface IData {
  [gallery: string]: {
    title: string;
    photos: Array<{
      photoID: string;
      url: string;
    }>
  }
}

interface IVariables {
  galleryID: number;
}

interface IProps {
  galleryID: number;
}

class GalleryQuery extends Query<IData, IVariables>{};

const Gallery: React.SFC<IProps> = ({ galleryID }) => {
  return (
    <GalleryQuery
      query={GALLERY_QUERY}
      variables={{ galleryID }}
    >
      {
        ({ data, loading }) => {
          if (loading) return 'loading...';
          // do not render anything if there is no data
          if (!data || data === undefined) return null;
          const { gallery } = data;
          // do not return anything if there are no photos
          if (!gallery || !gallery.photos.length) return null;
          const { title, photos} = gallery;
          return (
            <div>
              <h1>{title}</h1>
              { photos.map(({ photoID, url }) => <Photo imageType='thumbnail' src={url} key={photoID} />) }
            </div>
          )
        }
      }
    </GalleryQuery>
  )
}

export default Gallery;