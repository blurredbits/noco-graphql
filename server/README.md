## NoCo Javascript GraphQL Node Server

This is the Node/Express based server for the NoCo Javascript GraphQL demo.

Just a couple of notes before starting:

* Copy `config.temp.js` to `config.js` and update the mongo connection in the `config.js` file as needed. [MLAB](https://mlab.com/) is a great way to get started with MongoDB and completely free!

* The default port is 4000. If this is changed, please update the client `src/App.js` to point to the right spot as well.

* If starting with a blank DB, please add a few Breweries with the `addBrewery` mutation and [GraphiQL](http://localhost:4000/graphql).
