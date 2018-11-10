import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import {  defaultDataIdFromObject, InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const SONS_PHOTOS_URI = '/graphql';

// const token = localStorage.getItem('token');
const token = localStorage.getItem('token');

const headers = token? { authorization: `Bearer ${token}` } : null;

const httpLink = new HttpLink({
  uri: SONS_PHOTOS_URI,
  headers,
});

const cache = new InMemoryCache({
  dataIdFromObject: (object: any) => {
    switch (object.__typename) {
      case 'Photo':
        return object.photoID;
      case 'Gallery':
        return object.galleryID;
      default:
        return defaultDataIdFromObject(object);
    }
  }
});

const stateLink = withClientState({
  defaults: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
  cache,
  resolvers: {
    Query: {
      isLoggedIn: () =>  !!localStorage.getItem('token'),
    }
  }
});

const link = ApolloLink.from([stateLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
