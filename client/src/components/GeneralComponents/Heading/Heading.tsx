import * as React from 'react';
import styled from '../../../styled-components';

const HeadingPrimary = styled.h1`

`;

const HeadingSecondary = styled.h2`

`;

const HeadingTertiary = styled.h3`

`; 

interface IProps {
  headingType: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactChild;
}

export default (props: IProps) => {
  const { children } = props;
  switch (props.headingType) {
    case 'primary':
      return <HeadingPrimary>{children}</HeadingPrimary>;
      
    case 'secondary':
      return <HeadingSecondary>{children}</HeadingSecondary>;

    case 'tertiary':
      return <HeadingTertiary>{children}</HeadingTertiary>;
  }
};