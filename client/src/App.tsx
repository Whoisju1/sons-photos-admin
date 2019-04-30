import React from 'react';
import { ThemeProvider } from './styled-components';
import { GlobalStyle } from './GlobalStyle';
import { theme } from './theme';
import { authContext, authReducer } from './context/authContext';
import { Footer, Header, Main, Nav, Aside } from './layout';

// import Forms from './components/Forms';
// import AuthRender from './utils/AuthRender';

const App = () => {
  const auth = authReducer();
  return (
    <authContext.Provider value={auth}>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Header />
          <Aside heading={<div>Open</div>}>{() => <Nav />}</Aside>
          <Main />
          <Footer />
        </>
      </ThemeProvider>
    </authContext.Provider>
  );
};

export default App;
