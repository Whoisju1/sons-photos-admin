import * as React from 'react';
import styled from '../../styled-components';
import { Heading, Link } from '../GeneralComponents';

const SideNav = styled.nav`

`;

export default () => (
  <SideNav>
    <Heading headingType={'secondary'}>
      Side Nav
    </Heading>

    <Link to={'/account'} >
      Account
    </Link>

    <Link to={'/company'} >
      Company
    </Link>

    <Link to={'/galleries'} >
      Galleries
    </Link>

    <Link to={'/stats'} >
      Stats
    </Link>
  </SideNav>
);
