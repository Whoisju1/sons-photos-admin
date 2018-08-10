import * as React from 'react';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import Section from './components/Section';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Header />
        <Section />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
