const mongoose = require('mongoose')

const rateSchema = mongoose.Schema({
  user: { // user email (from auth)
    type: String,
    required: true,
  },
  song: { // song._id
    type: String,
    required: true,
  },
  rate: String
})
const Rate = mongoose.model('Rate', rateSchema);

module.exports = Rate;
