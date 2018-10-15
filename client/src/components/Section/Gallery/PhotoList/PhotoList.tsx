import * as React from 'react';
import PhotoDeleteBtn from 'src/components/GeneralComponents/Photo/PhotoDeleteBtn';
import styled from '../../../../styled-components';
import Photo from '../../../GeneralComponents/Photo/Photo';

const PhotoContainer = styled.div`
	border: .05rem solid gray;
	box-shadow: .05rem .07rem .14rem rgba(0, 0, 0, .3);
`;

interface IPhoto {
	url: string;
	photoID: string;
	filename: string;
}
export interface IProps {
	photos: IPhoto[];
	galleryID: string;
}

const PhotoList: React.SFC<IProps> = ({ photos, galleryID }) => {
	if (!photos) {
		console.log('no photos');
		return null;
	};
	if (!photos.length) return null;
	return (
		<React.Fragment>
			{photos.map(({ photoID, url, filename }) => (
				<PhotoContainer key={photoID}>
					<Photo imageType="thumbnail" src={url} />
					<PhotoDeleteBtn filename={filename} galleryID={galleryID} />
				</PhotoContainer>
			))}
		</React.Fragment>
	);
};

export default PhotoList;
