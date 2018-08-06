import * as React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const HeaderElm = styled.header`

`;

const Header: React.SFC = () => (
  <HeaderElm>
    <Logo logo="Son's Photos" />
  </HeaderElm>
);

export default Header;
