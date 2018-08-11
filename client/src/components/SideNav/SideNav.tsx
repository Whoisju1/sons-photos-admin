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
    <hr/>
    <Link to={'/account'} >
      Account
    </Link>
    <hr/>
    <Link to={'/company'} >
      Company
    </Link>
    <hr/>
    <Link to={'/galleries'} >
      Galleries
    </Link>
    <hr/>
    <Link to={'/stats'} >
      Stats
    </Link>
  </SideNav>
);
