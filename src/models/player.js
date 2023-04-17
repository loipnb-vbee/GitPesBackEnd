const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
  {
    sortname: String,
    name: String,
    image: String,
  }
);

module.exports = mongoose.model('Player', playerSchema);
