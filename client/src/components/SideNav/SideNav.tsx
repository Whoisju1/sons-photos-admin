import * as React from 'react';
import styled from '../../styled-components';
import { NavLink } from '../GeneralComponents';

const Link = styled(NavLink).attrs({
  activeClassName: 'active'
})`
`; 

const StyledNav = styled.nav`
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

const SideNav: React.SFC<{}> =  () => (
  <StyledNav>
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
  </StyledNav>
);

SideNav.displayName = 'SideNav';

export default SideNav;
