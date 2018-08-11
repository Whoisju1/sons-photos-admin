import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Link } from '../../GeneralComponents';
// import styled from '../../../styled-components';

const GET_GALLERIES = gql`
  query getGalleries ($sortBy: SortGalleryBy, $sortOrder: SortOrder) {
    galleries (sortBy: $sortBy, sortOrder: $sortOrder) {
      galleryID
      title
    }
  }
`;

interface IData {
  galleries: Array<{
    galleryID: string;
    title: string;
  }>
}

type SortGalleryBy = 'galleryID' | 'title' | 'clickCount' | 'createdAt';
type SortOrder = 'asc' | 'dsc';

interface IVariables {
  sortBy?: SortGalleryBy;
  sortOrder?: SortOrder;
}

class GalleriesQuery extends Query<IData, IVariables>{};

export default ({ sortBy = 'title', sortOrder = 'asc' }: IVariables) => (
  <GalleriesQuery
    query={GET_GALLERIES}
    variables={{ sortBy, sortOrder }}
  >
    {
      ({ data, loading, error }) => {
        if (error) {
          return 'Oops! Something went wrong.';
        }
        if (loading) return '...loading Galleries';
        if (!data || data === undefined) return null;
        const { galleries } = data;
        return galleries.map(({ galleryID, title }) => (
          <Link
            to={`/gallery/gallery/:${galleryID}`}
            key={galleryID}
          >
            {title}
          </Link>
          ));
      }
    }
  </GalleriesQuery>
)