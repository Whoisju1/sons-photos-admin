import gql from 'graphql-tag';

export const DELETE_PHOTO = gql`
	mutation deletePhoto($filenames: [String]!) {
		deletePhoto(filenames: $filenames) {
			photoID
		}
	}
`;

export const UPLOAD_IMAGE_MUTATION = gql`
mutation savedPhoto ($photoInfo:photoInput) {
	addPhoto (input:$photoInfo) {
		photoID
		url
		photoDescription
		createdAt
	}
}
`;

export const GET_PRESIGNED_URL = gql`
query getPresignedURL($filename: String!) {
	s3PreSignedURL(filename: $filename) {
		url
		key
	}
}
`;
