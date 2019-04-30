import React from 'react';
import styled from '../../../styled-components';
import { Link as BrowserLink, LinkProps } from 'react-router-dom';
import { linkStyles } from '../linkStyles';

const StyledLink = styled(BrowserLink)`
  ${linkStyles}
`;

interface IProps extends LinkProps {
  to: string;
  className?: string;
}
const Link: React.FunctionComponent<IProps> = (
  { to, children, className },
  ...props
) => {
  return (
    <StyledLink to={to} {...props} className={className}>
      {children}
    </StyledLink>
  );
};

export default Link;
