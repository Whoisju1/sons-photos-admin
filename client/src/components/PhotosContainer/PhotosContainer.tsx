import React from 'react';
import styled from '../../styled-components';

const StyledContainer = styled.div``;

interface Props {
  items: any[];
  children: (items: any) => React.ReactNode;
}

const PhotosContainer: React.FunctionComponent<Props> = props => {
  return <StyledContainer>{props.children(props.items)}</StyledContainer>;
};
