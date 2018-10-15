import * as React from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_PHOTO } from 'src/graphql/mutations/Photo';
import { GALLERY_QUERY } from '../../../../graphql/queries/Gallery';
import Button from '../../Button/Button';

interface IProps {
	filename: string;
	galleryID: string;
}
interface IDeletedPhoto {
	deletePhoto: Array<{ photoID: string; __typename: string;}>
}
export interface IPhoto {
  url: string;
  filename: string;
  photoID: string;
  __typename: string;
}

interface IGalleryData {
  gallery: {
		galleryID: string;
		galleryTitle: string;
		photos: IPhoto[];
		__typename: string;
	}
}

const PhotoDeleteBtn: React.SFC<IProps> = ({ filename, galleryID }) => (
  <Mutation mutation={DELETE_PHOTO}>
						{(deletePhoto, { data, loading, client }) => {
							if (loading) return '...loading';
							if (data) {
								// get the data for the selected gallery
								const { gallery } = client.readQuery({
									query: GALLERY_QUERY,
									variables: { galleryID },
								}) as IGalleryData;
								// get the id of the deleted photo
								const { photoID } = (data as IDeletedPhoto).deletePhoto[0];
								// remove the photo from the list of photos in the gallery
								gallery.photos = gallery.photos.filter(photo => photo.photoID !== photoID);
								// replace the data for the selected gallery
								client.writeQuery({
									query: GALLERY_QUERY,
									variables: { galleryID },
									data: { gallery },
								});
							}
							return (
								<Button
									btnType="danger"
									// tslint:disable-next-line:jsx-no-lambda
									click={() => deletePhoto({ variables : { filenames : [ filename ]}})}
								>
									Delete Photo
								</Button>
							);
						}}
					</Mutation>
);

export default PhotoDeleteBtn;

PhotoDeleteBtn.displayName = 'PhotoDeleteButton';