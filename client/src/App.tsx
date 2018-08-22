import * as React from 'react';
import { reset } from 'styled-reset';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import Section from './components/Section';
import SideNav from './components/SideNav';

import CreateGalleryForm from './components/Forms/CreateGalleryForm';
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

  #root {
    box-sizing: border-box;
    display: grid;
    min-height: 100vh;
    min-width: 100vw;
    font-size: 1.6rem;
    grid-template-columns: 10rem 1fr repeat(8, minmax(min-content, 14rem)) 1fr;
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
        <CreateGalleryForm />
      </React.Fragment>
    );
  }
}

export default App;
