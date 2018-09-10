import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getBreweriesQuery, addBeerMutation, getBeersQuery } from "../queries";

class AddBeer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      abv: "",
      breweryId: ""
    };
  }

  displayBreweries() {
    const getBreweriesQuery = this.props.getBreweriesQuery;
    if (getBreweriesQuery.loading) {
      return <option disabled>Loading Breweries...</option>;
    } else {
      if (getBreweriesQuery.breweries) {
        return getBreweriesQuery.breweries.map(brewery => {
          return (
            <option key={brewery.id} value={brewery.id}>
              {brewery.name}
            </option>
          );
        });
      }
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addBeerMutation({
      variables: {
        name: this.state.name,
        abv: this.state.abv,
        breweryId: this.state.breweryId
      },
      refetchQueries: [{ query: getBeersQuery }]
    });
  }

  render() {
    return (
      <form id="add-beer" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Beer name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="field">
          <label>ABV:</label>
          <input
            type="text"
            onChange={e => this.setState({ abv: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Brewery:</label>
          <select onChange={e => this.setState({ breweryId: e.target.value })}>
            <option>Select Brewery</option>
            {this.displayBreweries()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getBreweriesQuery, { name: "getBreweriesQuery" }),
  graphql(addBeerMutation, { name: "addBeerMutation" })
)(AddBeer);
