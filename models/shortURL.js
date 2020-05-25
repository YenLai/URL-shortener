const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortURL_schema = new Schema({
  origin_url: {
    type: String,
    require: true
  },
  short_url: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('shortURL', shortURL_schema)