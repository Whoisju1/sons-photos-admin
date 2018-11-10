import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import styled from '../../styled-components';

import { LOGIN_QUERY } from '../../graphql/queries/User';

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

interface IProps {
  onSubmit?: () => void;
}

interface IData {
  login: {
    accountID: string;
    token: string;
    firstName: string;
    lastName: string;
  }
}
class LoginForm extends React.Component<IProps, IState> {
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
                // set
                const { token } = userInfo.data.login;
                localStorage.setItem('token', token);
                client.writeData({ data: { isLoggedIn: !!token } });
                // If onSubmit function exists execute it otherwise do nothing
                this.props.onSubmit && this.props.onSubmit();
              }}
            >
              <Input
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                autoComplete="username"
                required={true}
                pattern="^\w+$"
                />
              <Input
                name="password"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                autoComplete="current-password"
                required={true}
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
