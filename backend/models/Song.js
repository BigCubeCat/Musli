const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  source: {
    type: String,
    required: true,
    trim: true
  },
  combination: {
    type: String,
    required: true
  },
  rates: [Number]
})
const Song = mongoose.model('Song', songSchema);

module.exports = Song;
