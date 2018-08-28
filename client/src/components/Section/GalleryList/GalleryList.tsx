import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Link } from '../../GeneralComponents';

const GET_GALLERIES = gql`
  query getGalleries ($sortBy: SortGalleryBy, $sortOrder: SortOrder) {
    galleries (sortBy: $sortBy, sortOrder: $sortOrder) {
      galleryID
      galleryTitle
    }
  }
`;

interface IData {
  galleries: Array<{
    galleryID: string;
    galleryTitle: string;
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
          console.log({error});
          return 'Oops! Something went wrong.';
        }
        console.log(data);
        if (loading) return '...loading Galleries';
        if (!data || data === undefined) return null;
        const { galleries } = data;
        return galleries.map(({ galleryID, galleryTitle }) => (
          <Link
            to={`/galleries/gallery/${galleryID}`}
            key={galleryID}
          >
            {galleryTitle}
            {console.log(galleryTitle)}
          </Link>
          ));
      }
    }
  </GalleriesQuery>
)