import * as React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import User from './User';

const HeaderElm = styled.header`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column: 1/-1;
  background-color: aliceblue;
`;

const Header: React.SFC = () => (
  <HeaderElm>
    <Logo logo="Son's Photos" />
    <User />
  </HeaderElm>
);

export default Header;
