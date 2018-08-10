import * as React from 'react';
import styled from 'styled-components';
import Gallery from './Gallery';

const SectionElm = styled.section`

`;

const Section: React.SFC<{}> = () => {
  return (
    <SectionElm>
      <Gallery galleryID={11} />
    </SectionElm>
  );
};

export default Section;
