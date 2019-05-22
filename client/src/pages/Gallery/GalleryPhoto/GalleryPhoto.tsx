import React from 'react';
import styled from '../../../styled-components';
import Photo from '../../../components/Photo';
import DeleteBtn from '../DeleteBtn';

const PhotoContainer = styled.div`
  display: grid;
  grid-template-rows: 10% auto;
  grid-template-columns: repeat(3, 1fr);
  & > button {
    z-index: 1;
    grid-row: 1/2;
    grid-column: -2/-1;
  }
`;

const StyledPhoto = styled.img`
  grid-row: 1/-1;
  grid-column: 1/-1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface Props {
  src: string;
  photoId: string;
  deleteAction: () => any;
}

const GalleryPhoto: React.FunctionComponent<Props> = props => {
  return (
    <PhotoContainer className="gallery-photo">
      <DeleteBtn photoId={props.photoId} />
      <StyledPhoto src={props.src} />
    </PhotoContainer>
  );
};

export default GalleryPhoto;
