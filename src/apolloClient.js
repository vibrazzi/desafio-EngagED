import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://rickandmortyapi.com/graphql', // URL da API GraphQL
    fetchOptions: {
      mode: 'cors', // Garante que as requisições sejam feitas com CORS
    },
  }),
  cache: new InMemoryCache(), // Configuração do cache
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network', // Busca no cache e na rede
      errorPolicy: 'all', // Retorna erros junto com os dados
    },
    query: {
      fetchPolicy: 'network-only', // Sempre busca na rede
      errorPolicy: 'all', // Retorna erros junto com os dados
    },
  },
});

export default apolloClient;
