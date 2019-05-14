import React from 'react';
import { Query } from 'react-apollo';

import { GET_ACCOUNT_QUERY } from '../../graphql/queries';
import {
  GetAccountInfoQuery,
  GetAccountInfoQueryVariables,
} from '../../gql-types.d';
import styled from '../../styled-components';

class GetAccount extends Query<
  GetAccountInfoQuery,
  GetAccountInfoQueryVariables
> {}

const StyledAccount = styled.section`
  display: grid;
  width: 100%;
  h1 {
    font-weight: 700;
    font-size: 3rem;
  }

  h3 {
    font-weight: 600;
    font-size: 2rem;
  }

  .credential {
    display: flex;
    flex-direction: row;
    /* border: .04rem solid gray; */
  }
`;

const Account = () => {
  return (
    <GetAccount query={GET_ACCOUNT_QUERY}>
      {({ data, error, loading }) => {
        if (error) {
          console.dir(error);
          return 'Oops! Something went wrong!';
        }
        if (loading) return '...loading';
        if (!data) return null;
        if (!data.getAccount) return;
        const {
          email,
          firstName,
          id,
          lastName,
          phone,
          username,
          role,
        } = data.getAccount;
        return (
          <StyledAccount>
            <h1>User Information</h1>
            <div className="fullName">
              <h3>Full Name</h3>
              <p>{`${firstName} ${lastName}`}</p>
            </div>
            <div className="username">
              <h3>Username</h3>
              <p>{username}</p>
            </div>
            <div className="email">
              <h3>Email Address</h3>
              <p>{email}</p>
            </div>
            <div className="phone heading">
              <h3>Phone Number</h3>
              <p>{phone}</p>
            </div>
            <div className="role">
              <h3>Role</h3>
              {/* Replace all underscores with a space */}
              <p>{(role as string).replace(/_/, ' ')}</p>
            </div>
          </StyledAccount>
        );
      }}
    </GetAccount>
  );
};

export default Account;
