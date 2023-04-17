const { ObjectId } = require('mongoose').Types;
const Match = require('../models/match');

const saveMatch = async ({
  groupStage,
  date,
  homeId,
  awayId,
  homeScore,
  awayScore,
  index,
}) => {
  const match = await Match.create({
    groupStage,
    date,
    homeId,
    awayId,
    homeScore,
    awayScore,
    index,
  });
  return match;
};

const findMatch = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const match = await Match.findById(condition);
    return match;
  }
  if (typeof condition === 'object' && condition !== null) {
    const match = await Match.findOne(condition);
    return match;
  }
  return null;
};
const findLastMatch = async () => {
  const lastMatch = await Match.findOne().sort({ index: -1 });
  return lastMatch;
};
const findListMatches = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const match = await Match.find(condition)
      .populate('homeId', { _id: 1, name: 1, image: 1 })
      .populate('awayId', { _id: 1, name: 1, image: 1 });
    return match;
  }
  if (typeof condition === 'object' && condition !== null) {
    const match = await Match.find(condition)
      .populate('homeId', { _id: 1, name: 1, image: 1 })
      .populate('awayId', { _id: 1, name: 1, image: 1 });
    return match;
  }
  return null;
};
const findAllMatches = async (isPopulate = true) => {
  let matches;
  if (isPopulate) {
    matches = await Match.find()
      .populate('homeId', { _id: 1, name: 1, image: 1 })
      .populate('awayId', { _id: 1, name: 1, image: 1 });
  } else {
    matches = await Match.find();
  }

  return matches;
};

module.exports = {
  saveMatch,
  findMatch,
  findAllMatches,
  findListMatches,
  findLastMatch,
};
