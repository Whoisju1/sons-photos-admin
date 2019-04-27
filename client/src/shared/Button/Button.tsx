import React, { PropsWithChildren } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import styled from '../../styled-components';

type ButtonType = 'PRIMARY' | 'DANGER' | 'INFO';

interface StyledData {
  buttonType: ButtonType;
  additionalStyles?: FlattenSimpleInterpolation;
}


const StyledButton = styled.button<StyledData>`
  background-color: ${(props) => {
    const { buttonType, theme: { colors }} = props;
    if (buttonType === 'PRIMARY') return colors.primaryColor;
    if (buttonType === 'DANGER') return colors.softRed;
    if (buttonType === 'INFO') return 'blue';
  }};
  /* This is to add additional styles to the button */
  ${({additionalStyles}) => additionalStyles || ''}
`;

interface Props {
  children: string;
  click: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonType?: ButtonType;
}

const Button: React.FunctionComponent<PropsWithChildren<Props>> = ({
  buttonType,
  children,
  click,
  }, ...props) => {
  return (
    <StyledButton
      buttonType={buttonType || 'PRIMARY'}
      {...props}
      onClick={click}
    >
      {children}
    </StyledButton>
  )
};

export default Button;
