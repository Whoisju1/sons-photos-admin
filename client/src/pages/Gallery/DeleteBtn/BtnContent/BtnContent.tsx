import React from 'react';
import styled, { keyframes } from 'styled-components';

const draw = keyframes`
  0% {
    stroke-dasharray: 36;
  }
  100% "{
    stroke-dasharray: 0;
  }
`;

const StyledSvg = styled.svg.attrs({
  viewBox: '0 -10 90 90',
  preserveAspectRatio: 'xMidYMid',
  xmlnsXlink: 'http://www.w3.org/1999/xlinl',
})`
  height: 100%;
  width: 100%;
  cursor: pointer;
  stroke: #2c3e50;
  #trash-can {
    stroke: #fff;
    stroke-width: 6;
  }
  #cover {
    transition: 0.5s all ease;
  }
  #middle-lines {
    stroke-dasharray: 36;
    animation-name: ${draw};
    animation-duration: 2.5s;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
    /* animation-iteration-count: infinite; */
  }
`;

const BtnContent: React.FC = () => {
  return (
    <StyledSvg>
      <g stroke="black" id="trash-can">
        <path
          d="
            M11,13
            s0,-7 9,-7
            h 14
            v-3
            h11
            v3
            h14
            s10,-1 10,7
          "
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          id="cover"
        />
        <path
          d="
            M19,15
            l3,50
            h36
            l3,-50
            Z
          "
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M30,22
            v36
            M40,22
            v36
            M50,22
            v36
          "
          id="middle-lines"
          fill="black"
          strokeLinecap="round"
        />
      </g>

      <symbol
        id="close-circle"
        refX="center"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" r="50" fill="#fff" />
        <path
          transform="rotate(45, 50, 50)"
          // style="mix-blend-mode: difference"
          id="semi-circle"
          d="M0,50
            A50,50 0 0 1 100,50
            H85
            V40
            H60
            V15
            H40
            V40
            H15
            V50
            Z
          "
          fill="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="black"
        />
        <use xlinkHref="#semi-circle" transform="rotate(180, 50, 50)" />
      </symbol>
      <use xlinkHref="#close-circle" x="50" y="30" />
    </StyledSvg>
  );
};

export default BtnContent;
