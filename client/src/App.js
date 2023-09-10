import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { Outlet } from "react-router-dom";
import Background from './components/Background/Background';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Background>
        <Outlet />
      </Background>
    </ApolloProvider>
  );
}

export default App;
