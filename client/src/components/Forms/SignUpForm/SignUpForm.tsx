import gql from 'graphql-tag';
import React, { useState, useContext } from 'react';
import { Mutation, MutationFn } from 'react-apollo';

import styled from '../../../styled-components';
import { authContext } from '../../../context/authContext';
import {
  ICreateUserInput,
  ICreateAccount,
  FormSubmit,
} from './types';

const CREATE_ACCOUNT = gql`
  mutation createAccount ($userInfo: createAccountInput!) {
    createAccount(input:$userInfo) {
      token
      username
      firstName
      lastName
    }
  }
`;

const StyledForm = styled.form`
  display: grid;
  grid-auto-flow: row;
  width: 50vw;
`;

const initialData: ICreateUserInput = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  email: '',
  phone: '',
  role: 'VIEWER'
}

const SignUpForm: React.FunctionComponent = () => {
  const [userInfo, setUserInfo] = useState<ICreateUserInput>(initialData)

  const { auth: { isLoggedIn }, authChange: { login } } = useContext(authContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (
    createUser: MutationFn<ICreateAccount, { userInfo: ICreateUserInput }>,
    ) => async (e: FormSubmit) => {
    try {
      e.preventDefault();
      const data = await createUser({
        variables: { userInfo }
      });
        if (data) {
          if (data.data) {
            login(data.data.createAccount.token);
          }
        setUserInfo(initialData);
      };
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Mutation mutation={CREATE_ACCOUNT}>
      {
        (createUser) => {
          return (
            <StyledForm onSubmit={handleSubmit(createUser)}>
              <input type="text" name="firstName" placeholder="First Name" value={userInfo.firstName} onChange={handleChange}/>
              <input type="text" placeholder="Last Name" name="lastName" value={userInfo.lastName} onChange={handleChange}/>
              <input type="text" placeholder="Username" name="username" value={userInfo.username} onChange={handleChange}/>
              <input type="email" placeholder="Email" name="email" value={userInfo.email} onChange={handleChange}/>
              <input type="phone" placeholder="Phone Number"  name="phone" value={userInfo.phone} onChange={handleChange}/>
              <input type="password" name="password" value={userInfo.password} placeholder="Password" onChange={handleChange} />
              <select name="role" id="role" value={userInfo.role} onChange={handleChange}>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="ADMIN">Admin</option>
                <option value="User">User</option>
              </select>
              <input type="submit" value="Submit"/>
            </StyledForm>
          )
        }
      }
    </Mutation>
  );
}

export default SignUpForm;
