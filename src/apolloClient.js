import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://rickandmortyapi.com/graphql',
    fetchOptions: { mode: 'cors' },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;
