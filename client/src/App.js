import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import Auth from './utils/auth';
import Headers from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      {!Auth.loggedIn() ? (
        <Headers />
      ) : (
        <>
          <NavBar />
          <Outlet />
        </>
      )}
    </ApolloProvider>
  );
}

export default App;
