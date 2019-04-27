import React from 'react';
import styled from '../../styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { GALLERY_QUERY } from '../../graphql/queries';
import PhotoUpload from '../../components/PhotoUpload';
import AddGalleryForm from '../../components/AddGalleryForm';

const StyledGalleries = styled.section`

`;

interface IData {
  id: string;
  title: string;
  description: string;
}

class GalleriesQuery extends Query<IData, {}>{}

const Galleries = () => {
  return (
    <GalleriesQuery query={GALLERY_QUERY}>
      {
        ({ data, error, loading }) => {
          if (error) {
            console.dir(error);
            return 'Oops! Something went wrong!'
          }
          if (loading) return 'loading...';
          return (
            <StyledGalleries>
              <AddGalleryForm />
              {/* <PhotoUpload galleryID={"2"} /> */}
            </StyledGalleries>
          );
        }
      }
    </GalleriesQuery>
  )
}

export default Galleries;
