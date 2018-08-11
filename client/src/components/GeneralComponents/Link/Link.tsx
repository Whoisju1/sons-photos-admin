import * as React from 'react';
import { Link as BrowserLink, LinkProps } from 'react-router-dom';
import styled from '../../../styled-components';

const StyledLink = styled(BrowserLink)<{}>`
  
`;

const Link: React.SFC<LinkProps> = props => {
  return (
    <StyledLink {...props}>
      {props.children}
    </StyledLink>
  )
};

export default Link;
