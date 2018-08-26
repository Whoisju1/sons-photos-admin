import * as React from 'react';
import styled from '../../styled-components';

const Footer = styled.footer`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-row: -2/-1;
  grid-column: 1/-1;
  background-color: darkgray;
  color: #ffffff;
  border: .05rem solid gray;
`;

const currentYear = new Date().getFullYear();

export default () => (
  <Footer>
    Sons Photos - {currentYear}
  </Footer>
);
