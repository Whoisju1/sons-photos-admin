import * as React from 'react';
import styled from '../../../styled-components';

type BtnType = 'primary' | 'secondary' | 'info' | 'danger';

// TODO: Add proper colors
const backgroundClr = {
  primary: 'blueviolet',
  secondary: 'light-blue',
  info: 'green',
  danger: 'red',
};

const StyledButton = styled<{btnType: BtnType}, 'button'>('button')`
  color: #ffff;
  background-color: ${({ btnType }) => backgroundClr[btnType]};
  &:disabled {
    cursor: not-allowed;
  }
  &:active {
    /* TODO: Add Proper Color */
    background-color: white;
    color: black;
  }
`;

interface IProps {
  click: <T>(args?: T) => void;
  btnType: BtnType
  enabled?: boolean;
}

const Button: React.SFC<IProps> = ({ click, enabled = true, children, btnType }) => (
  <StyledButton
    onClick={click}
    btnType={btnType}
    disabled={!enabled}
  >
    {children}
  </StyledButton>
);

export default Button;