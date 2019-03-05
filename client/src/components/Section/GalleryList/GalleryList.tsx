import React from 'react';
import { Query } from 'react-apollo';
import { GALLERIES_QUERY } from '../../../graphql/queries/Gallery';
import { Link } from '../../GeneralComponents';

interface IData {
  galleries: Array<{
    galleryID: string;
    title: string;
  }>;
}

type SortGalleryBy = 'galleryID' | 'title' | 'clickCount' | 'createdAt';
type SortOrder = 'asc' | 'dsc';

interface IVariables {
  sortBy?: SortGalleryBy;
  sortOrder?: SortOrder;
}

class GalleriesQuery extends Query<IData, IVariables> {}

const GalleryList = ({ sortBy = 'title', sortOrder = 'asc' }: IVariables) => (
  <GalleriesQuery
    query={GALLERIES_QUERY}
    variables={{ sortBy, sortOrder }}
  >
    {
      ({ data, loading, error }) => {
        if (error) {
          console.log({error});
          return 'Oops! Something went wrong.';
        }
        if (loading) return '...loading Galleries';
        if (!data || data === undefined) return null;
        const { galleries } = data;
        return galleries.map(({ galleryID, title }) => (
          <Link
            to={`/galleries/gallery/${galleryID}`}
            key={galleryID}
          >
            {title}
          </Link>
          ));
      }
    }
  </GalleriesQuery>
);

export default GalleryList;
