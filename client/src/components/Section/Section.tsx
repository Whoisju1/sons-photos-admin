import * as React from 'react';
import styled from 'styled-components';
import Galleries from './Galleries';

const SectionElm = styled.section`

`;

const Section: React.SFC<{}> = () => {
  return (
    <SectionElm>
      <Galleries />
    </SectionElm>
  );
};

export default Section;
