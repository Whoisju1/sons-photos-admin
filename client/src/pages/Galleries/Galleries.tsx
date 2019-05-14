import React, { useState } from 'react';
import styled from '../../styled-components';
import { Query } from 'react-apollo';
import { GALLERY_QUERY } from '../../graphql/queries';
import AddGalleryForm from '../../components/AddGallery/AddGalleryForm';
import {
  GetGalleriesQuery,
  GetGalleriesQueryVariables,
} from '../../gql-types.d';
import GalleryPreview from '../../components/GalleryPreview';
import { Link as BrowserLInk } from '../../shared/Link';

const Link = styled(BrowserLInk)`
  display: contents;
`;

const StyledGalleries = styled.section`
  .galleries {
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: left;
    grid-template-columns: repeat(auto-fit, minmax(min-content, 20rem));
    grid-auto-rows: min-content;
    grid-gap: 1rem;
    padding-top: 1rem;
  }
`;

class GalleriesQuery extends Query<
  GetGalleriesQuery,
  GetGalleriesQueryVariables
> {}

interface Props {}

const Galleries: React.FunctionComponent<Props> = () => {
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
        // TODO: Make sure that the list of galleries are being displayed because they're not
        return (
          <StyledGalleries>
            <div className="galleries">
              {galleries.map(gallery => {
                return (
                  <Link to={`gallery/${gallery.title}`}>
                    <GalleryPreview key={gallery.id} {...gallery} />
                  </Link>
                );
              })}
            </div>
          </StyledGalleries>
        );
      }}
    </GalleriesQuery>
  );
};

export default Galleries;
