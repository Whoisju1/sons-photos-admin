import * as React from 'react';
import { withRouter } from 'react-router-dom';
import styled from '../../../styled-components';
import LoginForm from '../../Forms/LoginForm';

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  history: {
    push: (path: string) => void;
  };
  location: {
    state: {
      from: string;
    };
  }
}

const LoginPage: React.SFC<IProps> = (props) => {
  console.log(props);
  const returnRoute = props.location.state.from || '/';
  return (
    <StyledSection>

      <LoginForm
        // tslint:disable-next-line:jsx-no-lambda
        onSubmit={() => props.history.push(returnRoute)}
      />
    </StyledSection>
  )
};

export default withRouter<any>(LoginPage);
