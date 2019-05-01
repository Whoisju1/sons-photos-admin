import React from 'react';
import styled from '../../styled-components';
import Photo from '../../components/Photo';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GALLERY_QUERY = gql`
  query GetGallery($id: ID!) {
    getGallery(id: $id) {
      id
      title
    }
  }
`;

class GalleryQuery extends Query<{}, {}>{ }

const StyledGallery = styled.section`
  grid-column: 1/-1;
  display: grid;
  width: 100%;
`;

const Gallery = (props: any) => {
  return (
    // get id from route param
    <GalleryQuery query={GALLERY_QUERY} variables={ {id: 2} }>
      {({ data, error, loading }) => {
        if (error) {
          console.log(error);
          return '...Error!'
        }
        if (loading) return '...loading';
        return (
          <StyledGallery>
            Gallery
          </StyledGallery>
        );
      }}
    </GalleryQuery>
  );
};

export default Gallery;
