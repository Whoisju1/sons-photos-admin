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

const Heading: React.SFC<{}> = (props: IProps) => {
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

export default Heading;

Heading.displayName = 'Heading';
