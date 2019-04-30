import React from 'react';
import styled, { css } from '../../styled-components';

type ButtonType = 'primary' | 'danger' | 'info';

const buttonStyles = {
  primary: css`
    background-color: green;
  `,
  danger: css`
    background-color: red;
  `,
  info: css`
    background-color: blue;
  `,
};
const StyledButton = styled.button<{ buttonType: ButtonType }>`
  ${props => buttonStyles[props.buttonType]}
`;

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  click: (e: React.MouseEvent) => void;
  type?: ButtonType;
}

const Button: React.FunctionComponent<IProps> = ({
  click,
  type = 'primary',
  children,
  ...props
}) => {
  return (
    <StyledButton onClick={click} buttonType={type} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
