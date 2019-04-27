import React, { useState } from 'react';
import styled from '../../styled-components';
import { Query } from 'react-apollo';
import { GALLERY_QUERY } from '../../graphql/queries';
import AddGalleryForm from '../../components/AddGalleryForm';
import Button from '../../components/Button';
import {
  GetGalleriesQuery,
  GetGalleriesQueryVariables,
} from '../../gql-types.d';
import GalleryPreview from '../../components/GalleryPreview';

const StyledGalleries = styled.section``;

class GalleriesQuery extends Query<
  GetGalleriesQuery,
  GetGalleriesQueryVariables
> {}

const Galleries = () => {
  const [showAddGalleryForm, setShowGalleryForm] = useState(false);

  return (
    <GalleriesQuery query={GALLERY_QUERY}>
      {({ data, error, loading }) => {
        if (error) {
          console.dir(error);
          return 'Oops! Something went wrong!';
        }
        if (loading) return 'loading...';

        if (!data) return <AddGalleryForm />;
        if (!data.galleries) return <AddGalleryForm />;
        if (!data.galleries.length) return <AddGalleryForm />;
        const { galleries } = data;

        return (
          <StyledGalleries>
            <div className="galleries">
              {galleries.map(gallery => (
                <GalleryPreview key={gallery.id} {...gallery} />
              ))}
            </div>
            <Button click={() => setShowGalleryForm(true)}>Add Gallery</Button>
            {showAddGalleryForm && <AddGalleryForm />}
          </StyledGalleries>
        );
      }}
    </GalleriesQuery>
  );
};

export default Galleries;
