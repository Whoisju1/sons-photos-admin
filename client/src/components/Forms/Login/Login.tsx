import React, { useState, useContext, useRef, RefObject } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { authContext } from '../../../context/authContext';

import styled from '../../../styled-components';
import { State, LoginInput } from './types';

const StyledForm = styled.form`
  h1 {
    text-transform: uppercase;
  }

  fieldset {
    display: grid;
  }
`;

const StyledInput = styled.input<{
  isValid: boolean,
  formDirty: boolean,
  inputValue: string,
}>`
  ${({ isValid = true, theme }) => !isValid && theme.inputValidation.invalid}
  &:invalid {
    ${props => props.formDirty && props.theme.inputValidation.invalid && props.inputValue.length}
  }
`;

const LOGIN = gql`
  query LoginUser ($credentials: LoginInput!) {
  login(input: $credentials) {
    token
  }
}
`;

const InputErrorMessage = styled.span<{ isVisible: boolean }>`
  display: ${({ isVisible }) => isVisible ? 'block' : 'none'};
  color: ${({ theme }) => theme.colors.softRed};
`;

const Login = (props: any) => {
  const [credentials, setCredentials] = useState<State>({
    identity: '',
    password: '',
  });

  const [fieldError, setFieldError] = useState({ message: '', field: '' });
  const [formValid, setFormValid] = useState<boolean>(true);
  const [formDirty, setFormDirty] = useState<boolean>(false);
  const InputSolid = (inputName: string) => (inputName !== fieldError.field);

  const throwFieldError = ({ message, field }: { message: string; field: string }) => {
    setFieldError({ message, field });
  }

  const { authChange: { login } } = useContext(authContext);
  console.log({ props });
  return (
    <ApolloConsumer>
      {
        client => {
          return (
            <StyledForm
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const { data: { login: { token } } } = await client.query<{login: { token: string }}, LoginInput>({
                    query: LOGIN,
                    variables: {
                      credentials: {
                        password: credentials.password,
                        username: credentials.identity,
                      },
                     },
                  });
                  login(token);
                  console.log(token);
                } catch(error) {
                  const { message } = error.graphQLErrors[0];
                  const { inputField: field } = error.graphQLErrors[0].extensions.exception;
                  if (field) {
                    throwFieldError({ message, field });
                  }
                }
              }}>
              <h1>Login</h1>
              <fieldset>
                <label htmlFor="credentials">Username/Email</label>
                <StyledInput
                  type="text"
                  placeholder="Username or Email"
                  id="credentials"
                  autoComplete="username"
                  inputValue={credentials.identity}
                  value={credentials.identity}
                  onChange={({ target }) => {
                    !formDirty && setFormDirty(true);
                    setFieldError({ field: '', message: ''});
                    setCredentials({ ...credentials, identity: target.value });
                  }}
                  required
                  isValid={InputSolid('username')}
                  formDirty={formDirty}
                  />
                  <InputErrorMessage isVisible={fieldError.field === 'username'}>
                    {fieldError.message}
                  </InputErrorMessage>
              </fieldset>

              <fieldset>
                <label htmlFor="password">Password</label>
                <StyledInput
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={credentials.password}
                  inputValue={credentials.password}
                  autoComplete="current-password"
                  onChange={({ target }) => {
                    !formDirty && setFormDirty(true);
                    setFieldError({ field: '', message: ''});
                    setCredentials({ ...credentials, password: target.value });
                  }}
                  required
                  formDirty={formDirty}
                  autoCorrect="current-password"
                  isValid={InputSolid('password')}
                  />
                  <InputErrorMessage isVisible={fieldError.field === 'password'}>
                    {fieldError.message}
                  </InputErrorMessage>
              </fieldset>
              <input type="submit" value="Login"/>
            </StyledForm>
          );
        }
      }
    </ApolloConsumer>
  )

};

export default Login;
