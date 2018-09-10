import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BeerList from './components/BeerList';
import AddBeer from './components/AddBeer';

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>NoCo Javascript Brewery List</h1>
          <BeerList />
          <AddBeer />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
