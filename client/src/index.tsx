import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { InMemoryCache  } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { ApolloProvider } from 'react-apollo';

import gql from 'graphql-tag';
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

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults: {
    getPhotoIDs: { photoIDs: [], __typename: 'photoID' }
  },
  resolvers: {
    Mutation: {
      // tslint:disable-next-line:no-shadowed-variable
      addPhotoID: (_: any, { id }: { id : string }, { cache }: { cache: InMemoryCache }) => {
        // fetch cached photoIDs
        const { getPhotoIDs: { ids } } = cache.readQuery({
          query: gql`
            query GetPhotoIDs {
              getPhotoIDs @client {
                ids: photoIDs
              }
            }
          `
        });

        // combine cached photoIDs with a new one
        const photoIDs = [...ids, id];

        // add new collection of photo ids to cache
        const data = { photoIDs, __typename: 'photoID' };
        cache.writeData({ data });
        return data;
      },
      removePhotoID: () => {
        // ...
      },
    },
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
