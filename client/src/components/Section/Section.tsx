import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../GeneralComponents';
import GalleryList from './GalleryList';

const SectionElm = styled.section`

`;

const Section: React.SFC<{}> = () => {
  return (
    <SectionElm>
      <Text> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ratione, temporibus, molestias itaque eos vero autem beatae aliquam consequuntur inventore, ullam nostrum? Sint corporis possimus molestias laudantium voluptatum aperiam quisquam assumenda labore nobis hic nisi eligendi ullam, officia ratione aliquam veniam necessitatibus aliquid. Impedit maiores delectus eum, quisquam libero ut! </Text>
      <GalleryList />
    </SectionElm>
  );
};

export default Section;
