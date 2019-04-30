import React from 'react';
import styled from '../../styled-components';

const StyledFooter = styled.footer`
  display: grid;
  grid-column: sidebar-start/full-end;
  grid-row: -2/-1;
  justify-content: center;
  align-items: center;
  border: 0.005rem solid lightgray;
`;

const Footer = () => {
  return <StyledFooter>Sons Photos - Admin</StyledFooter>;
};

export default Footer;
