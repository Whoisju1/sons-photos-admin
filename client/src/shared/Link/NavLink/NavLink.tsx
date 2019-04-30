import React from 'react';
import { NavLink as BrowserNavLink, NavLinkProps } from 'react-router-dom';
import styled from '../../../styled-components';
import { linkStyles } from '../linkStyles';

const StyledNavLink = styled(BrowserNavLink)`
  ${linkStyles}
`;

interface IProps extends NavLinkProps {
  className?: string;
}

const NavLink: React.FunctionComponent<IProps> = ({
  to,
  children,
  className,
  ...props
}) => (
  <StyledNavLink to={to} {...props} className={className}>
    {children}
  </StyledNavLink>
);

export default NavLink;
