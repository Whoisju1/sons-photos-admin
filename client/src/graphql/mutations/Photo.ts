import gql from 'graphql-tag';
import { PHOTO_FRAGMENT } from '../fragments';

export const DELETE_PHOTO = gql`
	mutation deletePhoto($filenames: [String]!) {
		deletePhoto(filenames: $filenames) {
			photoID
		}
	}
`;

export const UPLOAD_IMAGE_MUTATION = gql`
mutation savedPhoto ($photoInfo:photoInput!) {
	addPhoto (input:$photoInfo) {
		...photos
	}
}
${PHOTO_FRAGMENT}
`;

export const GET_PRESIGNED_URL = gql`
query getPresignedURL($filename: String!) {
	s3PreSignedURL(filename: $filename) {
		url
		key
	}
}
`;
