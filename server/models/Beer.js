const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const beerSchema = new Schema({
  name: String,
  abv: String,
  breweryId: String
});

module.exports = mongoose.model("Beer", beerSchema);
