import React from 'react';
import { reset } from 'styled-reset';
import { createGlobalStyle } from './styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const App = () => (
  <>
    <GlobalStyle />
  </>
);

export default App;
