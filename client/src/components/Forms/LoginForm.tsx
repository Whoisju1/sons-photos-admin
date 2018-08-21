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

const LOGIN_QUERY = gql`
query login ($credentials: loginInput) {
	login (input: $credentials) {
      accountID
      firstName
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
                const data = await client.query({
                  query: LOGIN_QUERY,
                  variables: { credentials: this.state }
                });

                console.log(data);
              }}
            >
              <Input
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <Input
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
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
