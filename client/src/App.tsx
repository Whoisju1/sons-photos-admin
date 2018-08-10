import * as React from 'react';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import Section from './components/Section';
import SideNav from './components/SideNav';

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
