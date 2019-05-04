import React, { useState } from 'react';
import styled from '../../styled-components';

const StyledAside = styled.aside`
  display: grid;
  grid-template-rows: 6rem repeat(auo-fill, min-content);
  /* grid-row: 1/-1; */
  grid-column: sidebar-start/sidebar-end;
  background-color: antiquewhite;
  padding-top: 1rem;
`;

interface IProps {
  children: () => React.ReactNode;
  heading: React.ReactNode;
}

const Aside: React.FunctionComponent<IProps> = props => {
  // don't forget to try this without using state to see if it will render
  const [isExpanded, setIsExpanded] = useState(false);
  return <StyledAside>{props.children()}</StyledAside>;
};

export default Aside;
