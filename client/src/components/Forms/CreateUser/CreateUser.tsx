import React, { useState, ChangeEventHandler } from 'react';
import styled from '../../../styled-components';
import { Role, State } from './types';

const StyledForm = styled.form`
  display: grid;
  grid-gap: 1.6rem;
  border: .5px solid lightgray;
  width: 30vw;
  margin: 0 auto;
  padding: 1rem;

  h2 {
    text-transform: uppercase;
    font-size: 200%;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-shadow: 1px 5px 17px rgba(0, 0, 0, .2);
  }

  .form-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: .3rem;
  }

  .input-wrapper {
    display: grid;
    row-gap: .3rem;
  }

  input, select, option {
    height: 1.8em;
  }
`;

const initialData: State = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  password2: '',
  phone: '',
  role: Role.ADMIN,
  username: '',
}

const options = Object.entries(Role)
  .map(([ key, value ], i) => (
    <option value={key} key={i}>
      {value}
    </option>
  ));

const CreateUserForm = () => {
  const [accountInfo, setAccountInfo] = useState<State>(initialData);

  const setState = (key: string, value: string) => {
    (setAccountInfo({ ...accountInfo, [key]: value }));
  };
  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState(name, value);
  };

  const checkIfMatched = () => {
    const { password, password2 } = accountInfo;
    const isMatched = (password === password2);
    if (!isMatched) {
      alert(`Doesn't match`);
    }
  }

  return (
    <StyledForm>
      <h2>Create User</h2>
      <div className="form-section">
        <div className="input-wrapper">
          <label htmlFor="firstName">First Name *</label>
          <input placeholder="John" name="firstName" id="firstName" value={accountInfo.firstName} onChange={handleChange}required />
        </div>

        <div className="input-wrapper">
          <label htmlFor="lastName">Last Name *</label>
          <input placeholder="Smith" name="lastName" id="lastName" value={accountInfo.lastName} onChange={handleChange} required />
        </div>
      </div>


      <div className="form-section">
        <div className="input-wrapper">
          <label htmlFor="email">Email Address *</label>
          <input  placeholder="example@domain.com" type="email" name="email" value={accountInfo.email} onChange={handleChange} required autoComplete="email" />
        </div>

        <div className="input-wrapper">
          <label htmlFor="phone">Phone</label>
          <input  placeholder="Phone Number" name="phone" type="phone" value={accountInfo.phone} onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <div className="input-wrapper">
          <label htmlFor="username">Username *</label>
          <input  placeholder="Username" name="username" value={accountInfo.username} onChange={handleChange} required autoComplete="username" />
        </div>

        <div className="input-wrapper">
          <label htmlFor="role">Role</label>
          <select name="role" id="role" defaultValue={accountInfo.role}>
            {options}
          </select>
        </div>
      </div>

      <div className="form-section">
        <div className="input-wrapper">
          <label htmlFor="password">Password *</label>
          <input  placeholder="Password" name="password" type="password" value={accountInfo.password} onChange={handleChange} autoComplete="new-password" required />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password2">Password Confirmation *</label>
          <input
            placeholder="Password Confirmation"
            name="password2" type="password"
            value={accountInfo.password2}
            onChange={handleChange}
            autoComplete="new-password"
            required
            onBlur={checkIfMatched}
            id="password2"
            />
        </div>
      </div>
      <input type="submit" value="Create User"/>
    </StyledForm>
  )
}

export default CreateUserForm;
