import * as React from 'react';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import Section from './components/Section';
import SideNav from './components/SideNav';

import { injectGlobal } from './styled-components';

injectGlobal`
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
