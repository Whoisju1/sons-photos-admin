import React from 'react';
import styled from '../../../styled-components';
import Button from '../../../shared/Button';

const StyledBtn = styled(Button)`
  border: none;
  padding: 0;
  background-color: transparent;
  outline: none;
`;

const StyledSvg = styled.svg`
  height: 100%;
  width: 100%;
`;

interface Props {
  click: () => any;
}

const DeleteButton: React.FunctionComponent<Props> = props => {
  return (
    <StyledBtn click={props.click}>
      <StyledSvg>
        <path
          stroke="#000"
          strokeWidth="1"
          fill="none"
          d="
          M10,10
          L20,20
        "
        />
      </StyledSvg>
    </StyledBtn>
  );
};

export default DeleteButton;
