import gql from 'graphql-tag';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import styled from '../../styled-components';

const SIGN_UP_MUTATION = gql`
  mutation signUp ($userInfo: createAccountInput) {
    createAccount (input: $userInfo) {
      firstName
      accountID
      lastName
      token
    }
  }
`;

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
  [first_name: string]: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  role: string;
}

class SignUpForm extends React.Component<{}, IState> {
  public state = {
    first_name: '',
    last_name: '',
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
  
                            console.log(userInfo);
                          } catch (err) {
                            console.log(err)
                            console.log('------------------');
                            console.dir(err);
                          }
                        }}
                      >
                        <Input 
                          placeholder="First Name"
                          value={this.state.first_name}
                          required={true}
                          name="first_name"
                          onChange={this.handleChange}
                          />
                        <Input 
                          placeholder="Last Name"
                          value={this.state.last_name}
                          required={true}
                          name="last_name"
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
                          />
                        <Input 
                          placeholder="Email Address"
                          type="email"
                          value={this.state.email}
                          required={true}
                          name="email"
                          onChange={this.handleChange}
                          />
                        <Input 
                          placeholder="Password"
                          type="password"
                          value={this.state.password}
                          required={true}
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
    console.log(this.state);
    this.setState({ [name]: value });
  }

  private handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ role: e.currentTarget.value });
  }
}

export default SignUpForm;
