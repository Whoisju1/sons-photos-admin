import * as React from 'react';
import { NavLink as BrowserNav, NavLinkProps } from 'react-router-dom';

const NavLink: React.SFC<NavLinkProps> = (props) => (
  <BrowserNav {...props}>
    {props.children}
  </BrowserNav>
);

export default NavLink;
