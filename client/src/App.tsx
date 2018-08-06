import * as React from 'react';
import Header from './components/Header/Header';
import Section from './components/Section';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Header />
        <Section />
      </React.Fragment>
    );
  }
}

export default App;
