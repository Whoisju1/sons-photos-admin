import React from 'react';
import styled from '../../styled-components';

const StyledCollection = styled.div`
  display: grid;
  grid-gap: 1rem;
  padding: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-auto-rows: 25rem 15rem;
  grid-auto-flow: dense;
  min-height: 100%;
  min-width: 100%;
  & > * {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 0.03rem solid lightgray;
    box-shadow: 0.1rem 0.1em 0.2rem rgba(0, 0, 0, 0.1);
    &:nth-child(3n) {
      grid-column: span 2;
    }
  }
`;

interface Props<T> {
  photos: T[];
  children: (items: T[]) => React.ReactNode;
}

const PhotosCollection = <T extends object>(props: Props<T>) => (
  <StyledCollection>{props.children(props.photos)}</StyledCollection>
);

export default PhotosCollection;
