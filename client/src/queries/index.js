import { gql } from "apollo-boost";

const getBeersQuery = gql`
  {
    beers {
      name
      id
    }
  }
`;

const getBreweriesQuery = gql`
  {
    breweries {
      name
      id
    }
  }
`;

const addBeerMutation = gql`
  mutation($name: String!, $abv: String!, $breweryId: ID!) {
    addBeer(name: $name, abv: $abv, breweryId: $breweryId) {
      name
      id
    }
  }
`;

const getBeerQuery = gql`
  query($id: ID) {
    beer(id: $id) {
      id
      name
      abv
      brewery {
        id
        name
        beers {
          name
          id
        }
      }
    }
  }
`;

export { getBreweriesQuery, getBeersQuery, addBeerMutation, getBeerQuery };
