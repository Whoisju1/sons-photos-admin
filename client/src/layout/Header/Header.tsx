import React from 'react';
import styled from '../../styled-components';

const StyledHeader = styled.header`
  display: grid;
  grid-column: 1/-1;
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="logo">
        Son's Photos Admin
      </div>
    </StyledHeader>
  );
};

export default Header;
