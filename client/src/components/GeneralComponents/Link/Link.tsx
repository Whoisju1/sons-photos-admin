import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from '../../../styled-components';

const StyledLink = styled(Link)<{}>`
  
`;

export default (
  props: LinkProps,
) => {
  return (
    <StyledLink {...props}>
      {props.children}
    </StyledLink>
  )
};
