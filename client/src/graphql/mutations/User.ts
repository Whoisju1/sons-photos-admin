import gql from 'graphql-tag';

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
