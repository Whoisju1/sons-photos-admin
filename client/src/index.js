import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const SONS_PHOTOS_URI = '/graphql';

const httpLink = new HttpLink({
  uri: SONS_PHOTOS_URI,
  headers: {
    authorization: `Bearer ${localStorage.get('token')}`,
  },
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
