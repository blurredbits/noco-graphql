const graphql = require("graphql");
const _ = require("lodash");
const Beer = require("../models/Beer");
const Brewery = require("../models/Brewery");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BeerType = new GraphQLObjectType({
  name: "Beer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    abv: { type: GraphQLString },
    brewery: {
      type: BreweryType,
      resolve(parent, args) {
        return Brewery.findById(parent.breweryId);
      }
    }
  })
});

const BreweryType = new GraphQLObjectType({
  name: "Brewery",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    beers: {
      type: new GraphQLList(BeerType),
      resolve(parent, args) {
        return Beer.find({ breweryId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    beer: {
      type: BeerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Beer.findById(args.id);
      }
    },
    brewery: {
      type: BreweryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Brewery.findById(args.id);
      }
    },
    beers: {
      type: new GraphQLList(BeerType),
      resolve(parent, args) {
        return Beer.find();
      }
    },
    breweries: {
      type: new GraphQLList(BreweryType),
      resolve(parent, args) {
        return Brewery.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBrewery: {
      type: BreweryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        state: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let brewery = new Brewery({
          name: args.name,
          address: args.address,
          city: args.city,
          state: args.state
        });
        return brewery.save();
      }
    },
    addBeer: {
      type: BeerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        abv: { type: new GraphQLNonNull(GraphQLString) },
        breweryId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let beer = new Beer({
          name: args.name,
          abv: args.abv,
          breweryId: args.breweryId
        });
        return beer.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
