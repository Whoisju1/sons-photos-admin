import gql from 'graphql-tag';

export const DELETE_PHOTO = gql`
	mutation deletePhoto($filenames: [String]!) {
		deletePhoto(filenames: $filenames) {
			photoID
		}
	}
`;