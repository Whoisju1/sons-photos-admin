import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import Form from '../../blocks/Form';

const LOGIN_QUERY = gql`
  query login ($credentials: loginInput) {
    login (input: $credentials) {
      accountID
      firstName
      token
    }
  }
`;

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const {
      username,
      password,
    } = this.state;

    return (
      <ApolloConsumer>
        {
          client => (
            <Form onSubmit={async (event) => {
              event.preventDefault();
              const { data } = await client.query({
                query: LOGIN_QUERY,
                variables: {
                  credentials: this.state,
                },
              });

              const { token } = data.login;
              localStorage.setItem(token, 'token');
            }}
            >
              <Form.TextInput
                value={username}
                name="username"
                placeholder="Username"
                onChange={this.handleChange}
              />
              <Form.PasswordInput
                value={password}
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
              <Form.SubmitBtn value="Login" />
            </Form>
          )
        }
      </ApolloConsumer>
    );
  }
}

export default LoginForm;
