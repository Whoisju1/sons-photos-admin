import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const SONS_PHOTOS_URI = '/graphql';

// const token = localStorage.getItem('token');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiYWNjb3VudF9pZCI6NX0sImlhdCI6MTUzMzk0NjgwMX0.udkOuyyz-6Xrngb_9egSXq2NGGXh4R0MiFxNtN357Ns';

const headers = token? { authorization: `Bearer ${token}` } : null;

const httpLink = new HttpLink({
  uri: SONS_PHOTOS_URI,
  headers,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
