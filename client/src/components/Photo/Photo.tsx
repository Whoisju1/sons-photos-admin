import React from 'react';
import styled from '../../styled-components';
import { FlattenInterpolation, css } from 'styled-components';

interface Props {
  src: string;
  additionalStyles?: FlattenInterpolation<{}>
}

interface StyledProps {
  additionalStyles?: FlattenInterpolation<{}>
}

const StyledPhoto = styled.img<StyledProps>`
  height: auto;
  border: .05rem solid lightgray;
  ${(props) => props.additionalStyles && props.additionalStyles}
`;

const Photo: React.FunctionComponent<Props> = ({ src, additionalStyles = css`` }) =>
  <StyledPhoto src={src} additionalStyles={additionalStyles} />;

export default Photo;
