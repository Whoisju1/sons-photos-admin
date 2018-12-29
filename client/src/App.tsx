import React from 'react';
import { reset } from 'styled-reset';

import Footer from './components/Footer';
import Header from './components/Header/Header';
import Section from './components/Section';
import SideNav from './components/SideNav';
import SignUpForm from './components/Forms/SignUpForm';

import { Route } from 'react-router';
import Auth from './Auth';
import LoginPage from './components/Section/LoginPage';
import { createGlobalStyle } from './styled-components';

const GlobalStyle = createGlobalStyle`
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
    grid-template-columns: repeat(12, minmax(min-content, 1fr));
    grid-template-rows: minmax(min-content, 100px) auto minmax(min-content, 100px);
  }
`;

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <Header />
        <Auth>
          <SideNav />
          <Section />
        </Auth>
        <Route path='/login' component={LoginPage}/>
        <SignUpForm />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
