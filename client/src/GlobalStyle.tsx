import { reset } from 'styled-reset';
import { createGlobalStyle } from './styled-components';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  html {
    font-size: 62.5%;
  }
  #root {
    display: contents;
  }
  body {
    box-sizing: border-box;
    display: grid;
    ${({ theme }) => theme.grid.primary}
    grid-template-rows: minmax(4rem, 6rem) auto minmax(4rem, 6rem);
    font-size: ${({ theme }) => theme.fontSize.default};
    min-height: 100vh;
  }
`;