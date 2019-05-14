import React from 'react';
import styled from '../../styled-components';
import Link from '../../shared/Link';

const StyledLink = styled(Link)`
  display: contents;
`;

const StyledGalleryPreview = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: 100%;
  padding-top: 1rem;
  .title {
    display: flex;
    justify-content: center;
    grid-column: 1/-1;
    grid-row: 1/2;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.heading3};
    color: #fff;
    grid-row: 1/2;
    grid-column: 1/2;
    z-index: 1;
    border: 0.01rem solid gray;
    text-shadow: 0.4rem 0.5rem 2rem rgba(255, 255, 255, 0.1);
    /* TODO: This should be a gradient */
    background-color: rgba(0, 0, 0, 0.1);
    &:hover {
      /* TODO: This should be a gradient */
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  img {
    grid-column: 1/3;
    height: auto;
    grid-row: 1/2;
    width: 100%;
  }
  .description {
    grid-row: 2/3;
  }
`;

interface IProps {
  title: string;
  description?: string | null | undefined;
  thumbnail?: string | null | undefined;
}

const GalleryPreview: React.FunctionComponent<IProps> = ({
  description,
  thumbnail = 'https://i.pinimg.com/564x/42/57/d3/4257d3e3f37cf8a8f2bb8e16f46c7a3e.jpg',
  title,
}) => (
  <StyledLink to={`gallery/${title}`}>
    <StyledGalleryPreview>
      {thumbnail && <img src={thumbnail} alt="Gallery Thumbnail" />}
      <h2 className="title">{title}</h2>
      <div className="description">
        {description ? description : 'No description'}
      </div>
    </StyledGalleryPreview>
  </StyledLink>
);

export default GalleryPreview;
