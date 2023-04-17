const playerDaos = require('../daos/player');
const matchDaos = require('../daos/match');
const playerServices = require('../services/player');

const findOne = async (req, res) => {
  const player = await playerDaos.findPlayer(req.params.id);
  return res.send({ status: 1, result: player });
};
const findAll = async (req, res) => {
  const players = await playerDaos.findAllPlayer();
  res.send({ status: 1, result: players });
};
const getRankingPlayer = async (req, res) => {
  const ranking =await playerServices.getRankPlayer();
  res.send({ status: 1, result: ranking });
};

module.exports = { findOne, findAll, getRankingPlayer };
