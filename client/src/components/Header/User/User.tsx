import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

const  GET_USER = gql`
  query getAccount {
    account {
      username
    }
  }
`;

interface IData {
  account: {
    username: string;
  }
}

const User = styled.div`

`;

class UserQuery extends Query<IData>{};

export default () => (
  <UserQuery
    query={GET_USER}
  >
    {
      ({ data, loading, error }) => {
        if (error) return 'Oops! Something went wrong';
        if (loading) return '...loading';
        
        if (!data || data === undefined) return null;
        if (!data.account) return 'No user exists';
        const { username } = data.account;
        return <User>{username}</User>
      }
    }
  </UserQuery>
);
