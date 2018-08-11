import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { match } from 'react-router-dom';
import Photo from '../../Photo';

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
  match: match<{ galleryID: string }>
}

class GalleryQuery extends Query<IData, IVariables>{};

const Gallery: React.SFC<IProps> = (props) => {
  const { galleryID: id } = props.match.params;
  const galleryID = parseFloat(id);

  return (
    <GalleryQuery
      query={GALLERY_QUERY}
      variables={{ galleryID }}
    >
      {
        ({ data, loading, error }) => {
          if (error) return 'Oops! Something went wrong!';
          if (loading) return 'loading...';
          // do not render anything if there is no data
          if (!data || data === undefined) return 'there\s nothing';
          const { gallery } = data;
          // do not return anything if there are no photos
          if (!gallery) return null;
          const { title, photos} = gallery;
          return (
            <div>
              <h1>{title}</h1>
              {
                !!gallery.photos.length ?
                  photos.map(({ photoID, url }) => <Photo imageType='thumbnail' src={url} key={photoID} />) :
                  `There are no photos in the '${title}' Gallery`
              }
            </div>
          )
        }
      }
    </GalleryQuery>
  )
}

export default Gallery;