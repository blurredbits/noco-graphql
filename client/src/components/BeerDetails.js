import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBeerQuery } from "../queries";

class BeerDetails extends Component {
  displayBeerDetails() {
    const { beer } = this.props.data;
    if (beer) {
      return (
        <div id="beer-details">
          <h2>{beer.name}</h2>
          <p>ABV: {beer.abv}</p>
          <p>{beer.brewery.name}</p>
          <p>All beers at this Brewery</p>
          <ul className="other-beers">
            {beer.brewery.beers.map(beer => {
              return <li key={beer.id}>{beer.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div id="beer-details">No Beer selected</div>;
    }
  }

  render() {
    return this.displayBeerDetails();
  }
}

export default graphql(getBeerQuery, {
  options: props => {
    return {
      variables: {
        id: props.beerId
      }
    };
  }
})(BeerDetails);
