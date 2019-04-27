import React from 'react';
import styled from '../../styled-components';
import { Route, Switch } from 'react-router-dom';

import AuthRoute from '../../utils/AuthRoutes';
import Forms from '../../components/Forms';

// import pages
import { Gallery, Galleries, Account } from '../../pages';

const StyledMain = styled.main`
  display: grid;
  grid-column: 2/-2;
`;

const Main = () => {
  return (
    <StyledMain>
      <Switch>
        <Route path="/login" component={Forms.Login} />
        <Route path="/galleries" component={Galleries} />
        <Route path="/galleries/gallery/:id" component={Gallery} />
        <AuthRoute>
          <Route exact path="/account" component={Account} />
        </AuthRoute>
      </Switch>
    </StyledMain>
  );
};

export default Main;
