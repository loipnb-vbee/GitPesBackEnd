const matchDaos = require('../daos/match');
const matchServices = require('../services/match');

const findAllMatches = async (req, res) => {
  const matches = await matchDaos.findAllMatches();
  return res.send({ status: 1, result: matches });
};

const findMatchesPlayer = async (req, res) => {
  const matches = await matchServices.findMatchPlayer(req.params.id);
  return res.send({ status: 1, result: matches });
};

const saveMatch = async (req, res) => {
  const { groupStage, date, homeId, awayId, homeScore, awayScore } = req.body;
  const match =await matchDaos.findLastMatch();
  const index=match.index+1;
  const matchSave =await matchDaos.saveMatch({ groupStage, date, homeId, awayId, homeScore, awayScore,index });
  return res.send({
    status: 1,
    result: { groupStage, date, homeId, awayId, homeScore, awayScore,index },
  });
};

module.exports = { findAllMatches, findMatchesPlayer, saveMatch };
