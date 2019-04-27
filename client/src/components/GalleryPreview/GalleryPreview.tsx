import React from 'react';
import styled from '../../styled-components';

const StyledGalleryPreview = styled.div`
  display: grid;
  border: 0.05rem solid lightgray;
  .title {
    font-size: ${({ theme }) => theme.fontSize.heading2};
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`;

interface IProps {
  title: string;
  description?: string | null | undefined;
  thumbnail?: string | null | undefined;
}

const GalleryPreview: React.FunctionComponent<IProps> = ({
  description,
  thumbnail,
  title,
}) => (
  <StyledGalleryPreview>
    {thumbnail && <img src={thumbnail} alt="Gallery Thumbnail" />}
    <h2 className="title">{title}</h2>
    <div className="description">
      {description ? description : 'No description'}
    </div>
  </StyledGalleryPreview>
);

export default GalleryPreview;
