import * as React from 'react';
import { Mutation, Query } from 'react-apollo';
import { match } from 'react-router-dom';
import { CACHE_GALLERY, GALLERY_CACHE_SINGLE, GALLERY_QUERY  } from '../../../graphql/queries/Gallery';
import { IGalleryData } from '../../../graphql/resolvers';
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
	[gallery: string]: {
		galleryTitle: string,
		photos: Array<{
			photoID: string,
			url: string,
			filename: string,
		}>,
	},
}

export interface ICacheVariable {
  gallery: IGalleryData;
}

interface IVariables {
	galleryID: string,
}

interface IProps {
	match: match<{ galleryID: string }>,
}

class GalleryQuery extends Query<IData, IVariables> {}
// tslint:disable-next-line:max-classes-per-file
class SingleGalleryQuery extends Query<{getCachedGallery: IGalleryData}, { galleryID: string }> {}

// tslint:disable-next-line:max-classes-per-file
class CacheGalleryMutation extends Mutation<IGalleryData, ICacheVariable> {};

// tslint:disable-next-line:max-classes-per-file
const Gallery: React.SFC<IProps> = props => {
	const { galleryID } = props.match.params;

	return (
		<GalleryQuery query={GALLERY_QUERY} variables={{ galleryID }}>
			{({ data, loading, error, client }) => {
				if (error) {
					console.log({ error });
					return 'Oops! Something went wrong!';
        }
				if (loading) return 'loading...';
				// do not render anything if there is no data
				if (!data || data === undefined) return "there's nothing";
				const { gallery } = data;
				// do not return anything if there are no photos
				if (!gallery) return null;
        const { galleryTitle } = gallery;

        const receivedPhotos = gallery.photos.map((photo) => ({ ...photo, __typename: 'Photo'}))

        const receivedGallery = {
          galleryID,
          __typename: 'Gallery',
          photos: receivedPhotos,
        };

        client.mutate({
          mutation: CACHE_GALLERY,
          variables: { gallery: receivedGallery },
          update: ( store,  { data: { cacheGallery } }: { data: { cacheGallery: IGalleryData} }) => {
            store.writeQuery({
              query: GALLERY_CACHE_SINGLE,
              data: { getCachedGallery : cacheGallery },
              variables: { galleryID: cacheGallery.galleryID }
            });
          },
        });

				return (
          // add data to cache
					<CacheGalleryMutation
            mutation={CACHE_GALLERY}
          >
						{() => {
              return (
                <GalleryContainer>
                  <Heading headingType="secondary">{galleryTitle}</Heading>
                  <UploadForm galleryID={galleryID} galleryTitle={galleryTitle} />
                  {!!gallery.photos.length ? (
                    <SingleGalleryQuery query={GALLERY_CACHE_SINGLE} variables={{ galleryID }}>
                      {({ data: cachedData, loading: cacheLoading, error: err }) => {
                        if (err) {
                          console.dir(err);
                          return 'Oh oh! Something is wrong!';
                        }
                        if (cacheLoading) return '...loading';
                        if (!cachedData) return 'no data received';
                        if (!cachedData.getCachedGallery) return 'no data received';
                        return <PhotoList photos={cachedData.getCachedGallery.photos} galleryID={galleryID} />;
                      }}
                    </SingleGalleryQuery>
                  ) : (
                    `There are no photos in the '${galleryTitle}' Gallery`
                  )}
                </GalleryContainer>
              )
            }}
					</CacheGalleryMutation>
				);
			}}
		</GalleryQuery>
	);
};

export default Gallery;
