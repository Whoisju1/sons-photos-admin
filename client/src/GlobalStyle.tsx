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
    grid-template-columns: ${({ theme }) => theme.grid.primary};
    grid-template-rows: 5rem minmax(3rem, min-content) 1fr minmax(8rem, 10rem);
    font-size: ${({ theme }) => theme.fontSize.default};
    min-height: 100vh;
  }
`;
