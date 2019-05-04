import React from 'react';
import styled from '../../styled-components';
import { NavLink } from '../../shared/Link';

const StyledNav = styled.nav`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 1rem;
  .active {
    background-color: green;
  }
`;

const Nav = () => {
  return (
    <StyledNav>
      <NavLink to="/galleries" exact activeClassName="active">
        Galleries
      </NavLink>
    </StyledNav>
  );
};

export default Nav;
