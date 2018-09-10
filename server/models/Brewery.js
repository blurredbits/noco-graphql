const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brewerySchema = new Schema({
  name: String,
  address: String,
  city: String,
  state: String
})

module.exports = mongoose.model('Brewery', brewerySchema)
