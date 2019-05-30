import React, { useState } from 'react';
import styled from '../../styled-components';

const StyledBtn = styled.button`
  width: 5rem;
  height: 5rem;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  position: fixed;
  bottom: 20rem;
  right: 20rem;
`;

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in-out;
  .line {
    transition: all 0.2s ease-in-out;
  }
  &:hover .line {
    transform: scale(1.1);
    transform-origin: 50% 50%;
    stroke-width: 4;
    stroke: #fff200;
  }
  &:hover {
    transform: scale(1.1);
  }
  circle {
    fill: #9b59b6;
    fill-opacity: 0.8;
  }
`;

interface Props {
  buttonTitle: string;
}

const AddPhotoBtn: React.FC<Props> = ({ buttonTitle, children }) => {
  const [showComponent, setShowComponent] = useState(false);
  const handleClick = () => setShowComponent(!showComponent);
  return (
    <>
      {showComponent ? children : null}
      <StyledBtn onClick={handleClick}>
        <StyledSvg>
          <symbol id="add" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <title>{buttonTitle}</title>
            <circle cx="50" cy="50" r="50" />
            <line
              x1="50"
              y1="20"
              x2="50"
              y2="80"
              fill="#fff"
              strokeWidth="20"
              stroke="#fff"
              className="line"
            />
            <line
              x1="20"
              y1="50"
              x2="80"
              y2="50"
              fill="#fff"
              strokeWidth="20"
              stroke="#fff"
              className="line"
            />
          </symbol>
          <use xlinkHref="#add" />
        </StyledSvg>
      </StyledBtn>
    </>
  );
};

export default AddPhotoBtn;
