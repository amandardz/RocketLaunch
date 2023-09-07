// import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLInk } from '@apollo/client';

// const httpLink = createHttpLInk({
//   uri: '/graphql', 
// });

// const client = new ApolloClient({
//   link: httpLink, 
//   cache: new InMemoryCache(), 
// });

import Home from './pages/Home';

function App() {
  // return (
  //   <ApolloProvider client={client}>
  //     <div>Hello World!</div>
  //   </ApolloProvider>
  // );
  return <Home />
};

export default App;
