import * as React from 'react';
import styled from '../../styled-components';

const Img = styled<IStyleProps, 'img'>('img')`

`;

interface IStyleProps {
  imageType: 'thumbnail' | 'full-size';
}

interface IProps {
  src: string;
  imageType: 'thumbnail' | 'full-size';
}

const Photo: React.SFC<IProps> = ({ src, imageType }) => <Img src={src} imageType={imageType} />;

export default Photo;
