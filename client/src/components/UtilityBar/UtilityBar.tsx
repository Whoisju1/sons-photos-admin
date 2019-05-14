import React from 'react';
import styled from '../../styled-components';
import AddGallery from '../AddGallery';

interface Props {}

const StyledUtilityBar = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => theme.grid.primary};
  background-color: #ecf0f1;
  padding: 1rem 0 1rem 0;
  grid-column: 1/-1;
  .container {
    display: grid;
    grid-column: center-start/center-end;
  }
`;

const UtilityBar: React.FunctionComponent<Props> = props => {
  return (
    <StyledUtilityBar>
      <div className="container">
        <AddGallery />
      </div>
    </StyledUtilityBar>
  );
};

export default UtilityBar;
