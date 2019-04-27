import React, { useContext } from 'react';
import { authContext } from '../context/authContext';

type Props = React.PropsWithChildren<{
  children: JSX.Element | JSX.Element[];
  alternate?: React.FunctionComponent<any> | React.FunctionComponent<any>[] | JSX.Element | JSX.Element[];
}>;
const AuthRender: React.FunctionComponent<Props> = ({  alternate: alternateComponent = null, children }) => {
  const { auth: { isLoggedIn } } = useContext(authContext);
  return (
    <>
      {
        isLoggedIn
        ? children
        : alternateComponent
      }
    </>
  )
};

export default AuthRender;
