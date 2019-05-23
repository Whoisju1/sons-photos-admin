import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from '../../styled-components';
// import Photo from '../../components/Photo';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { GetGalleryQuery, QueryGetGalleryArgs, Photo } from '../../gql-types.d';
import PhotoUpload from '../../components/PhotoUpload';
import GalleryPhoto from './GalleryPhoto';
import PhotosCollection from '../../components/PhotosCollection';

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

const StyledGalleryContainer = styled.div`
  display: grid;
  grid-template-rows: 3rem auto;
  grid-column: 1/-1;
  margin-top: 1rem;
  .gallery {
    grid-column: 1/-1;
    display: grid;
    grid-gap: 1rem;
    padding: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    grid-auto-rows: 25rem 15rem;
    grid-auto-flow: dense;
    border: 0.05rem solid gray;
  }
  & > .gallery-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    &:nth-child(3n) {
      grid-column: span 2;
    }
  }
  .title {
    grid-row: 1/2;
    grid-column: 1/-1;
    display: grid;
    max-height: 4rem;
    justify-content: center;
    align-items: center;
  }
  &:last-child {
    margin-bottom: 1rem;
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
          <StyledGalleryContainer>
            <h2 className="title">{title}</h2>
            {!photos || !photos.length ? (
              <PhotoUpload galleryTitle={gallery} />
            ) : (
              <PhotosCollection<Photo> photos={photos as any}>
                {galleryPhotos =>
                  galleryPhotos.map(photo => (
                    <GalleryPhoto
                      key={photo.id}
                      photoId={photo.id}
                      src={`https://s3.amazonaws.com/sons-photos-bucket/${
                        photo.url
                      }`}
                      deleteAction={() => console.log('delete Photo')}
                    />
                  ))
                }
              </PhotosCollection>
            )}
          </StyledGalleryContainer>
        );
      }}
    </GalleryQuery>
  );
};

export default Gallery;
