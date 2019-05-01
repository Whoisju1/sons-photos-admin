import React, { useContext } from 'react';
import styled from '../../../styled-components';
import { authContext } from '../../../context/authContext';
import { Link } from 'react-router-dom';

const StyledAuthentication = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  .logout,
  .login {
    cursor: pointer;
  }
`;

interface IProps {
  className?: string;
}

const Authentication: React.FunctionComponent<IProps> = ({ className }) => {
  const {
    auth: { isLoggedIn },
    authChange: { logout },
  } = useContext(authContext);
  return (
    <StyledAuthentication className={className}>
      {isLoggedIn ? (
        <div className="logout" onClick={logout}>
          Logout
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </StyledAuthentication>
  );
};

export default Authentication;
