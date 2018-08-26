import * as React from 'react';
import styled from '../../styled-components';
import { NavLink } from '../GeneralComponents';

const Link = styled(NavLink).attrs({
  activeClassName: 'active'
})`
`; 

const SideNav = styled.nav`
  display: grid;
  grid-column: 1/4;
  grid-auto-rows: 10rem;
  padding-top: 1rem;
  grid-gap: 1rem;
  border: .05rem solid green;
  & * {
    border: .05rem solid gold;
    display: grid;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    text-transform: uppercase;
    color: green;
    &:hover {
      background-color: bisque;
    }
  }
  .active {
    background-color: lightgoldenrodyellow;
  }
`;

export default () => (
  <SideNav>
    <Link to={'/account'}>
      Account
    </Link>

    <Link to={'/company'}>
      Company
    </Link>

    <Link to={'/galleries'}>
      Galleries
    </Link>

    <Link to={'/stats'}>
      Stats
    </Link>
  </SideNav>
);

SideNav.displayName = 'SideNav';