import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { InMemoryCache  } from 'apollo-cache-inmemory';
import { ApolloClient, ApolloError } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { ApolloProvider } from 'react-apollo';

import { GET_ALL_PHOTO_IDS, PHOTO_ID_CLIENT_QUERY } from './graphql/queries/photoIDs';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

import App from './App';
import { PHOTO_ID_CLIENT_MUTATION,  } from './graphql/mutations/photo-ids-@client';
import registerServiceWorker from './registerServiceWorker';

const SONS_PHOTOS_URI = '/graphql';

// const token = localStorage.getItem('token');
const token = localStorage.getItem('token');

const headers = token? { authorization: `Bearer ${token}` } : null;

const httpLink = new HttpLink({
  uri: SONS_PHOTOS_URI,
  headers,
});

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  typeDefs,
  resolvers,
});

const link = ApolloLink.from([stateLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
});

client.mutate({
  mutation: PHOTO_ID_CLIENT_MUTATION,
  variables: {
    galleryID: '2',
    ids: ['2', '3', '4'],
  }
})
  .then(data => data)
  .catch((err: ApolloError) => {
    console.dir(err);
    console.log(err);
  })

client.query({
  query: PHOTO_ID_CLIENT_QUERY,
  variables: { galleryID: '2'}
})
.then(data => {
  console.log(data);
})
.catch(err => {
  console.dir(err);
  console.log(err.message);
});

client.query({
  query: GET_ALL_PHOTO_IDS,
})
.then(data => {
  console.log(data);
})
.catch(err => {
  console.dir(err);
  console.log(err.message);
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
