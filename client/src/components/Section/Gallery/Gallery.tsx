import React from 'react';
import { Query } from 'react-apollo';
import { match } from 'react-router-dom';
import { GALLERY_QUERY } from '../../../graphql/queries/Gallery';
import styled from '../../../styled-components';
import UploadForm from '../../Forms/UploadForm';
import { Heading } from '../../GeneralComponents';
import PhotoList from './PhotoList/PhotoList';

const PhotoContainer = styled.div`
  border: .05rem solid gray;
  box-shadow: .05rem .07rem .14rem rgba(0, 0, 0, .3);
`;

PhotoContainer.displayName = 'PhotoContainer';

const GalleryContainer = styled.div`
  display: grid;
  grid-column: 1/-1;
  grid-row: 1/-1;
  position: relative;
  grid-auto-flow: column;
  grid-auto-columns: minmax(min-content, min-content);
`;

GalleryContainer.displayName = 'GalleryContainer';

interface IData {
  gallery: {
    title: string,
    photos: Array<{
      photoID: string,
      url: string,
      filename: string,
    }>,
  };
}
interface IVariables {
  galleryID: string;
}
interface IProps {
  match: match<{ galleryID: string }>;
}

class GalleryQuery extends Query<IData, IVariables> {}

// tslint:disable-next-line:max-classes-per-file
const Gallery: React.SFC<IProps> = props => {
  const { galleryID } = props.match.params;

  return (
    <GalleryQuery query={GALLERY_QUERY} variables={{ galleryID }}>
      {({ data, loading, error }) => {
        if (error) {
          console.log({ error });
          return 'Oops! Something went wrong!';
        }
        if (loading) return 'loading...';
        // do not render anything if there is no data
        if (!data || data === undefined) return 'there\'s nothing';
        const { gallery } = data;
        // do not return anything if there are no photos
        if (!gallery) return null;
        const { title } = gallery;
        return (
          <GalleryContainer>
            <Heading headingType='secondary'>{title}</Heading>
            <UploadForm galleryID={galleryID} title={title} />
            {
              !!gallery.photos.length ?
              <PhotoList photos={gallery.photos} galleryID={galleryID} /> :
              `There are no photos in the '${title}' Gallery`
            }
          </GalleryContainer>
        );
      }}
    </GalleryQuery>
  );
};

export default Gallery;
