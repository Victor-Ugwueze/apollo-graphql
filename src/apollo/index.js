import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { cache, initialData } from './cache';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const httpLink = new HttpLink({
  uri: 'https://temp-graphql-server.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const { token } = localStorage;
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers,
  typeDefs,
});

client.onResetStore(() => cache.writeData({ data: initialData }));

export default client;
