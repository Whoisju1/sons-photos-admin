import React from 'react';
import styled from '../../styled-components';
import { Link } from '../../shared/Link';

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: ${({ theme }) => theme.grid.primary};
  grid-column: sidebar-start/full-end;
  grid-row: 1/2;
  background-color: blanchedalmond;
  .logo {
    display: grid;
    align-items: center;
    grid-column: center-start/span 3;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    color: black;
    text-shadow: 0.5rem 0.4rem 2rem rgba(0, 0, 0, 0.3);
  }
`;

interface IProps {
  logo?: React.ReactNode;
}

const Header: React.FunctionComponent<IProps> = ({ logo }) => {
  return (
    <StyledHeader>
      <Link to="/" className="logo">
        {logo || "Son's Photos Admin"}
      </Link>
    </StyledHeader>
  );
};

export default Header;
