import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { authContext } from '../context/authContext';

type Props = React.PropsWithChildren<{
  children: JSX.Element;
  redirectTo?: string;
}>

const AuthRoute: React.FunctionComponent<Props> = ({ children, redirectTo = '/login' }) => {
  const auth = useContext(authContext);
  console.log({ auth });
  if (!auth.auth.isLoggedIn) return <Redirect to={redirectTo} />
  return (
    <>
      { children }
    </>
  );
};

export default AuthRoute;
