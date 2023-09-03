import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLInk } from '@apollo/client';

const httpLink = createHttpLInk({
  uri: '/graphql', 
});

const client = new ApolloClient({
  link: httpLink, 
  cache: new InMemoryCache(), 
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>Hello World!</div>
    </ApolloProvider>
  );
}

export default App;
