import gql from 'graphql-tag';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import styled from '../../styled-components';

const Form = styled.form``;

const Input = styled.input``;

const SubmitBtn = styled.input.attrs({
  value: 'Login',
  type: 'submit',
})`

`;

interface IState {
  [username: string]: string;
  password: string;
}

interface IData {
  login: {
    accountID: string;
    token: string;
    firstName: string;
    lastName: string;
  }
}

const LOGIN_QUERY = gql`
query login ($credentials: loginInput) {
	login (input: $credentials) {
      accountID
      token
    }
  }
`;

class LoginForm extends React.Component<{}, IState> {
  public state = {
    username: '',
    password: '',
  }

  public render() {
    return (
     <ApolloConsumer>
       {
         client => {
           return (
            <Form
              // tslint:disable-next-line:jsx-no-lambda
              onSubmit={async (e) => {
                e.preventDefault();
                const userInfo = await client.query<IData>({
                  query: LOGIN_QUERY,
                  variables: { credentials: this.state }
                });

                const { token } = userInfo.data.login;
                localStorage.setItem('token', token);
              }}
            >
              <Input
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                autoComplete="username"
              />
              <Input
                name="password"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                autoComplete="current-password"
              />
              <SubmitBtn />
            </Form>
           );
         }
       }
     </ApolloConsumer>
    );
  }

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      name,
      value,
    } = e.currentTarget;
    this.setState({ [name]: value });
  }
}

export default LoginForm;
