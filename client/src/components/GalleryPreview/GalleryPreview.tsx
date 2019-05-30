import React from 'react';
import styled from '../../styled-components';
import Link from '../../shared/Link';

const StyledGalleryPreview = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: 100%;
  padding-top: 1rem;
  &:hover {
    & img {
      filter: blur(1px);
    }
  }
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
    white-space: pre;
    transition: all 0.5s ease;
    &:hover {
      /* TODO: This should be a gradient */
      background-color: rgba(0, 0, 0, 0.3);
    }
    &--photo-count {
      color: aliceblue;
    }
  }
  img {
    grid-column: 1/3;
    height: auto;
    grid-row: 1/2;
    width: 100%;
    object-fit: cover;
    transition: all 0.5s ease-in;
  }
  .description {
    grid-row: 2/3;
  }
`;

interface IProps {
  title: string;
  description?: string | null | undefined;
  thumbnail?: string | null | undefined;
  photoCount: number;
}

const GalleryPreview: React.FunctionComponent<IProps> = ({
  description,
  thumbnail = 'https://i.pinimg.com/564x/42/57/d3/4257d3e3f37cf8a8f2bb8e16f46c7a3e.jpg',
  title,
  photoCount,
}) => (
  <StyledGalleryPreview>
    {thumbnail && <img src={thumbnail} alt="Gallery Thumbnail" />}
    <h2 className="title">
      {title} <span className="title--photo-count"> ({photoCount})</span>
    </h2>
    <div className="description">
      {description ? description : 'No description'}
    </div>
  </StyledGalleryPreview>
);

export default GalleryPreview;
