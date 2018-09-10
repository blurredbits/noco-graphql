const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/index");
const dbConfig = require("./config.js");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

mongoose.connect(
  dbConfig.url,
  { useNewUrlParser: true }
);

app.listen(4000, () => {
  console.log("server now listening on port 4000");
  mongoose.connection.once("open", () => {
    console.log("-----> connected to DB");
  });
});
