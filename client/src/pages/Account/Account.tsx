import React from 'react';
import { Query } from 'react-apollo';

import { Role } from '../../gql-types.d';
// import { Role } from '../../backend_schema';
import { GET_ACCOUNT } from '../../graphql/queries';
import styled from '../../styled-components';

interface IAccount {
  getAccount: {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    phone: string;
    username: string;
    role: Role;
  }
}

class GetAccount extends Query<IAccount> {};

const StyledAccount = styled.section`
  display: grid;
  width: 100%;
  border: .04rem solid lightgray;
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
    <GetAccount query={GET_ACCOUNT}>
      {
        ({ data, error, loading }) => {
          if (error) {
            console.dir(error);
            return 'Oops! Something went wrong!';
          }
          if (loading) return '...loading';
          if (!data) return null;
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
              <div className="credential">
                <h3>Full Name</h3>
                <p>{`${firstName} ${lastName}`}</p>
              </div>
              <div className="credential">
                <h3>Username</h3>
                <p>{username}</p>
              </div>
              <div className="credential">
                <h3>Email Address</h3>
                <p>{email}</p>
              </div>
              <div className="credential">
                <h3>Role</h3>
                <p>{role}</p>
              </div>
            </StyledAccount>

          );
        }
      }
      </GetAccount>
  );
};

export default Account;
