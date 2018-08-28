import gql from 'graphql-tag';
import * as React from 'react';
import { ApolloConsumer, Query } from 'react-apollo';
import { match } from 'react-router-dom';
import styled from '../../../styled-components';
import UploadForm from '../../Forms/UploadForm';
import { Button, Photo } from '../../GeneralComponents';
import { Heading } from '../../GeneralComponents';

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

const GALLERY_QUERY = gql`
  query getGallery ($galleryID: Int) {
    gallery (galleryID: $galleryID) {
      galleryTitle
      photos {
        url
        photoID
        filename
      }
    }
  }
`;

const DELETE_PHOTO = gql`
  mutation deletePhoto ($filenames: [String]!) {
    deletePhoto (filenames: $filenames) {
      photoID
    }
  }
`;

interface IData {
  [gallery: string]: {
    galleryTitle: string;
    photos: Array<{
      photoID: string;
      url: string;
      filename: string,
    }>
  }
}

interface IVariables {
  galleryID: number;
}

interface IProps {
  match: match<{ galleryID: string }>
}

class GalleryQuery extends Query<IData, IVariables>{};

const Gallery: React.SFC<IProps> = (props) => {
  const { galleryID: id } = props.match.params;
  const galleryID = parseFloat(id);

  return (
    <GalleryQuery
      query={GALLERY_QUERY}
      variables={{ galleryID }}
    >
      {
        ({ data, loading, error }) => {
          if (error) {
            console.log({error});
            return 'Oops! Something went wrong!';
          };
          if (loading) return 'loading...';
          // do not render anything if there is no data
          console.log(data);
          if (!data || data === undefined) return 'there\s nothing';
          const { gallery } = data;
          // do not return anything if there are no photos
          if (!gallery) return null;
          const { galleryTitle, photos} = gallery;
          return (
            <GalleryContainer>
              <Heading headingType="secondary">{galleryTitle}</Heading>
              <UploadForm galleryID={id} />
              {
                !!gallery.photos.length ?
                  photos.map(({ photoID, url, filename }) =>  (
                    <PhotoContainer key={photoID}>
                      <Photo 
                        imageType='thumbnail'
                        src={url}
                        />
                      <ApolloConsumer key={url}>
                        {
                          client => (
                            <Button
                            // tslint:disable-next-line:jsx-no-lambda
                            click={() => client.mutate({
                              mutation: DELETE_PHOTO,
                              variables: {
                                  filenames: [filename],
                                },
                              })}
                              btnType="danger"
                              >
                              {
                                console.log(filename)
                              }
                              Delete Photo
                            </Button>
                          )
                        }
                      </ApolloConsumer>
                    </PhotoContainer>
                  )) :
                  `There are no photos in the '${galleryTitle}' Gallery`
              }
            </GalleryContainer>
          )
        }
      }
    </GalleryQuery>
  )
}

export default Gallery;