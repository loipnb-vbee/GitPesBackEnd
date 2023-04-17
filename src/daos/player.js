const { ObjectId } = require('mongoose').Types;
const Player = require('../models/player');

const findPlayer = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const player = await Player.findById(condition);
    return player;
  }
  if (typeof condition === 'object' && condition !== null) {
    const player = await Player.findOne(condition);
    return player;
  }
  return null;
};
const findAllPlayer = async () => {
  const players = await Player.find();
  return players;
};

module.exports = { findAllPlayer, findPlayer };
