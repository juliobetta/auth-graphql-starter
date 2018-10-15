import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Layout from './components/Layout';
import Form from './components/Form';

const client = new ApolloClient({
  /**
   * @see https://dev.apollodata.com/react/cache-updates.html
  */
  dataIdFromObject: o => o.id,
  connectToDevTools: true,
  link: new HttpLink({
    uri: '/graphql',
    credentials: 'same-origin'
  }),
  cache: new InMemoryCache(),
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Layout exact path="/" component={() => <div>YELLOOWWWW</div>} />
          <Layout exact path="/signup" component={Form} />
          <Layout exact path="/login" component={Form} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
