import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from '../../styled-components';
import Photo from '../../components/Photo';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { GetGalleryQuery, QueryGetGalleryArgs } from '../../gql-types.d';
import PhotoUpload from '../../components/PhotoUpload';

const GALLERY_QUERY = gql`
  query GetGallery($title: String!) {
    getGallery(title: $title) {
      id
      title
      photos {
        id
        url
      }
    }
  }
`;

class GalleryQuery extends Query<GetGalleryQuery, QueryGetGalleryArgs> {}

const StyledGallery = styled.section`
  grid-column: 1/-1;
  display: grid;
  width: 100%;
  padding-top: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(7rem, 10rem));
  & > img {
    width: 100%;
  }
  .title {
    grid-row: 1/2;
  }
`;

interface Params {
  gallery: string;
}

interface Props extends RouteComponentProps<Params> {}

const Gallery: React.FunctionComponent<Props> = ({ match }) => {
  const {
    params: { gallery },
  } = match;
  return (
    <GalleryQuery query={GALLERY_QUERY} variables={{ title: gallery }}>
      {({ data, error, loading }) => {
        if (error) {
          console.dir(error);
          return '...Error!';
        }
        if (loading) return '...loading';
        if (!data) return;
        const { title, photos } = data.getGallery;

        return (
          <StyledGallery>
            <h2 className="title">{title}</h2>
            {(() => {
              if (!photos || !photos.length)
                return <PhotoUpload galleryTitle={gallery} />;
              return photos.map(photo => {
                if (!photo) return '...No Photo';
                const photoUrl = `https://s3.amazonaws.com/sons-photos-bucket/${
                  photo.url
                }`;
                return <Photo key={photo.id} src={photoUrl} />;
              });
            })()}
          </StyledGallery>
        );
      }}
    </GalleryQuery>
  );
};

export default Gallery;
