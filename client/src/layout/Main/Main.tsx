import React from 'react';
import styled from '../../styled-components';
import { Route, Switch } from 'react-router-dom';

import AuthRoute from '../../utils/AuthRoutes';
import Forms from '../../components/Forms';

// import pages
import { Gallery, Galleries, Account, NotFound } from '../../pages';
import PhotoUpload from '../../components/PhotoUpload';

const StyledMain = styled.main`
  display: grid;
  grid-column: center-start/center-end;
`;

const Main = () => {
  return (
    <StyledMain>
      <Switch>
        <Route path="/login" component={Forms.Login} />
        <AuthRoute>
          <Route path="/gallery/:gallery" component={Gallery} />
        </AuthRoute>
        <Route path="/galleries" component={Galleries} />
        <AuthRoute>
          <Route exact path="/account" component={Account} />
        </AuthRoute>
        <Route path="*" component={NotFound} />
      </Switch>
    </StyledMain>
  );
};

export default Main;
