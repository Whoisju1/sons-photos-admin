import gql from 'graphql-tag';

export const  GET_USER = gql`
query getAccount {
  account {
    username
  }
}
`;

export const LOGIN_QUERY = gql`
query login ($credentials: loginInput!) {
	login (input: $credentials) {
      accountID
      token
    }
  }
`;
