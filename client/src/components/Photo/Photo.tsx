import * as React from 'react';
import styled from '../../styled-components';

const Img = styled<IStyleProps, 'img'>('img')`
  max-width: ${ props => (props.imageType === 'full-size') ? '90vw' : '20rem'};
  height: auto;
`;

interface IStyleProps {
  imageType: 'thumbnail' | 'full-size';
}

interface IProps {
  src: string;
  imageType: 'thumbnail' | 'full-size';
}

const Photo: React.SFC<IProps> = ({ src, imageType }) => <Img src={`https://sons-photos-bucket.s3.amazonaws.com/${src}`} imageType={imageType} />;

export default Photo;
