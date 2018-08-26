import * as React from 'react';
import styled from '../../styled-components';

const StyledFooter = styled.footer`
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

const Footer: React.SFC<{}> = () => (
  <StyledFooter>
    Sons Photos - {currentYear}
  </StyledFooter>
);


export default Footer;

Footer.displayName = 'Footer';
