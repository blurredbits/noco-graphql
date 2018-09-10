import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBeersQuery } from "../queries";

import BeerDetails from "./BeerDetails";

class BeerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  displayBeers() {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading Beers...</div>;
    } else {
      if (data.beers) {
        return data.beers.map(beer => {
          return (
            <li
              key={beer.id}
              onClick={e => this.setState({ selected: beer.id })}
            >
              {beer.name}
            </li>
          );
        });
      } else {
        return <li>No Beers found!</li>;
      }
    }
  }

  render() {
    return (
      <div>
        <ul id="beer-list">{this.displayBeers()}</ul>
        <BeerDetails beerId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBeersQuery)(BeerList);
