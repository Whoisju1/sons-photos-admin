import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  logo?: string;
}
 
const Logo: React.SFC<IProps> = ({ logo }) => {
  const LogoElm = styled.div`

  `;
  
  return (
    <LogoElm>
      {logo || 'Sons Photos'}
    </LogoElm>
  );
}
 
export default Logo;