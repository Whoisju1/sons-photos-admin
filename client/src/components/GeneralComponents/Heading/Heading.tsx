import React from 'react';
import styled, { css } from '../../../styled-components';

const headingStyles = css`
  justify-content: center;
  align-items: center;
`;

const HeadingPrimary = styled.h1`
  grid-column: 1/-1;
  ${headingStyles}
`;

const HeadingSecondary = styled.h2`
  ${headingStyles}
`;

const HeadingTertiary = styled.h3`
  ${headingStyles}
`;

interface IProps {
  headingType: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactChild;
}

const Heading: React.SFC<IProps> = (props) => {
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
