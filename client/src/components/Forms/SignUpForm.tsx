import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { SIGN_UP_MUTATION } from '../../graphql/mutations/User';
import styled from '../../styled-components';

const Form = styled.form`

`;

const Input = styled.input`

`;

const SubmitBtn = styled.input.attrs({
  type: 'submit',
  value: 'Sign Up',
})`

`;

const RoleSelection = styled.select.attrs({
  value: 'role',
  name: 'role',
})`

`;

const RoleOption = styled.option`

`;

interface IState {
  // tslint:disable-next-line:variable-name
  [firstName: string]: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  role: string;
}

class SignUpForm extends React.Component<{}, IState> {
  public state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    role: 'admin',
  };
  
  public render() {
    return (
      <ApolloConsumer>
        {
          client => {
            return (
                      <Form
                        // tslint:disable-next-line:jsx-no-lambda
                        onSubmit={async (e) => {
                          try {
                            e.preventDefault();

                            const userInfo = await client.mutate({
                              mutation: SIGN_UP_MUTATION,
                              variables: { userInfo: this.state },
                            });

                            if (
                              !userInfo ||
                              (userInfo === undefined) ||
                              !userInfo.data ||
                              userInfo.data === undefined
                            ) return;
                            const { token } = userInfo.data.createAccount;
                            localStorage.setItem('token', token);
                          } catch (err) {
                            console.log(err)
                            console.log('------------------');
                            console.dir(err);
                          }
                        }}
                      >
                        <Input 
                          placeholder="First Name"
                          value={this.state.firstName}
                          required={true}
                          name="firstName"
                          onChange={this.handleChange}
                          />
                        <Input 
                          placeholder="Last Name"
                          value={this.state.lastName}
                          required={true}
                          name="lastName"
                          onChange={this.handleChange}
                          />
                        <Input 
                          placeholder="Username"
                          value={this.state.username}
                          required={true}
                          name="username"
                          onChange={this.handleChange}
                          />
                        <Input 
                          placeholder="Phone"
                          value={this.state.phone}
                          name="phone"
                          onChange={this.handleChange}
                          autoComplete="phone"
                          />
                        <Input 
                          placeholder="Email Address"
                          type="email"
                          value={this.state.email}
                          required={true}
                          autoComplete="email"
                          name="email"
                          onChange={this.handleChange}
                          />
                        <Input 
                          placeholder="Password"
                          type="password"
                          value={this.state.password}
                          required={true}
                          autoComplete="current-password"
                          name="password"
                          onChange={this.handleChange}
                          />
                        <RoleSelection
                          value={this.state.role}
                          // onChange={this.handleChange}
                          onChange={this.handleSelect}
                        >
                          <RoleOption value="admin">Admin</RoleOption>
                          <RoleOption value="manager">Manger</RoleOption>
                          <RoleOption value="viewer">Viewer</RoleOption>
                        </RoleSelection>
                          <SubmitBtn />
                      </Form>
            )
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

  private handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ role: e.currentTarget.value });
  }
}

export default SignUpForm;
