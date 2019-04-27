import React from 'react';
import styled from '../../styled-components';

const StyledFooter = styled.footer`
  display: grid;
  grid-column: 1/-1;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return <StyledFooter>Sons Photos - Admin</StyledFooter>;
};

export default Footer;
