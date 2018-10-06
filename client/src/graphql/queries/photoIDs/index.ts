import gql from 'graphql-tag';

export interface IPhotoIDs {
	photoIDs: string[],
	galleryID: string,
	__typename: string;
}

export interface IPhotoIDCache {
	photoIDCache: IPhotoIDs[],
	__typename: string;
}

export const GET_ALL_PHOTO_IDS = gql`
	query GetAllPhotoIDs @client {
		getAllPhotoIDs @client {
			photoIDCache {
				photoIDs
				galleryIDs
			}
		}
	}
`;

export const PHOTO_ID_CLIENT_QUERY = gql`
	query GetPhotoIDs($galleryID: ID) {
		getPhotoIDs(galleryID: $galleryID) @client {
			photoIDCache {
				photoIDs
				galleryIDs
			}
		}
	}
`;