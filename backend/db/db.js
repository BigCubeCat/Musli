const mongoose = require('mongoose')

function connect(uri = "") {
  mongoose.connect(uri, {
    useNewUrlParser: true,
  })
}

module.exports = {
  connect
};
