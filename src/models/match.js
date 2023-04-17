const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  groupStage: String,
  date: String,
  homeId: { type: String, ref: 'Player' },
  awayId: { type: String, ref: 'Player' },
  homeScore: Number,
  awayScore: Number,
  index: Number,
},{timestamps:true});
module.exports = mongoose.model('Match', matchSchema);
