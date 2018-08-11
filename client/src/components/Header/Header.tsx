import * as React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import User from './User';

const HeaderElm = styled.header`

`;

const Header: React.SFC = () => (
  <HeaderElm>
    <Logo logo="Son's Photos" />
    <User />
  </HeaderElm>
);

export default Header;
