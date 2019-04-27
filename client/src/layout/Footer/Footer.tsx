import React from 'react';
import styled from '../../styled-components';

const StyledFooter = styled.footer`
  display: grid;
  grid-column: 1/-1;
`;

const Footer = () => {
  return (
    <StyledFooter>
      Footer
    </StyledFooter>
  );
};

export default Footer;
