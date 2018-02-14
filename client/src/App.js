import React, { Component } from 'react';
import styled from 'styled-components';
import baseStyles from './base-styles';

/* eslint react/prefer-stateless-function:[ "off"] */
class App extends Component {
  render() {
    baseStyles();

    const RootElement = styled.div`
      min-width: 100vw;
      min-height: 100vh;
    `;

    return (
      <RootElement>
        Sons Photos
      </RootElement>
    );
  }
}

export default App;
