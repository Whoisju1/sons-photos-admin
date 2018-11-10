import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

interface IProps {
  children: React.ReactChild[] | React.ReactChild;
  location?: string;
}

interface IData {
  isLoggedIn: boolean;
}

const GET_AUTH_STATUS = gql`
  query @client {
   isLoggedIn
  }
`;

class Authorization extends Query<IData>{}

const Auth: React.SFC<IProps> = (props) => (
      <Authorization
        query={GET_AUTH_STATUS}
      >
        {
          ({ data, loading, error }) => {
            const redirectRoute = '/login';
            if (error) return 'Oops! Something went wrong.';
            if (loading || !data) return null;
            return (
              <>
                {
                  data.isLoggedIn ?
                  props.children :
                  (window.location.pathname !== redirectRoute) &&
                  <Redirect
                    to={
                      {
                        pathname: redirectRoute,
                        state: { from: location.pathname }
                      }
                    }
                  />
                }
              </>
            )
          }
        }
      </Authorization>
);

export default Auth;
