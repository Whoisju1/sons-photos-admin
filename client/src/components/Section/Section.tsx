import * as React from 'react';
import styled from 'styled-components';
import GalleryList from './GalleryList';

const SectionElm = styled.section`

`;

const Section: React.SFC<{}> = () => {
  return (
    <SectionElm>
      <GalleryList />
    </SectionElm>
  );
};

export default Section;
