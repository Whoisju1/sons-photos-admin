import * as React from 'react';
import { reset } from 'styled-reset';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import Section from './components/Section';
import SideNav from './components/SideNav';

import { injectGlobal } from './styled-components';

injectGlobal`
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
  body {
    box-sizing: border-box;
    display: grid;
    min-height: 100vh;
    min-width: 100vw;
  }
`;

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Header />
        <SideNav />
        <Section />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
