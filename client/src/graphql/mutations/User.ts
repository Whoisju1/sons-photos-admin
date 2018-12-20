import gql from 'graphql-tag';

export interface ISignUp {
  firstName: string;
  lastName: string;
  accountID: string;
  token: string;
}

export const SIGN_UP_MUTATION = gql`
mutation signUp ($userInfo: createAccountInput) {
  createAccount (input: $userInfo) {
    firstName
    accountID
    lastName
    token
  }
}
`;
