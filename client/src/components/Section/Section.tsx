import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import GalleryList from './GalleryList';

const SectionElm = styled.section`

`;

const Section: React.SFC<{}> = () => {
  return (
    <SectionElm>
      <Switch>
        <Route path={'/galleries'} component={GalleryList} />
      </Switch>
    </SectionElm>
  );
};

export default Section;
