import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  logo?: string;
}
const LogoElm = styled.div`
  grid-column: 2/4;
`;
 
const Logo: React.SFC<IProps> = ({ logo }) => {
  
  return (
    <LogoElm>
      {logo || 'Sons Photos'}
    </LogoElm>
  );
}
 
export default Logo;