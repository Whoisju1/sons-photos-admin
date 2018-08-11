import * as React from 'react';
import styled from '../../styled-components';
import { Link } from '../GeneralComponents';

const SideNav = styled.nav`

`;

export default () => (
  <SideNav>
    <Link to={'/galleries'} >
      Galleries
    </Link>
  </SideNav>
);
