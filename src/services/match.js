const matchDaos = require('../daos/match');

const findMatchPlayer = async (idplayer) => {
  const matcheshome = await matchDaos.findListMatches({ homeId: idplayer });
  const matchesaway = await matchDaos.findListMatches({ awayId: idplayer });
  let dataSends = [];
  let i = 0;
  let j = 0;
  while (i < matcheshome.length && j < matchesaway.length) {
    if (matcheshome[i].index < matchesaway[j].index) {
      dataSends.push(matcheshome[i]);
      i++;
    } else {
      dataSends.push(matchesaway[j]);
      j++;
    }
  }
  while (i < matcheshome.length) {
    dataSends.push(matcheshome[i]);
    i++;
  }
  while (j < matchesaway.length) {
    dataSends.push(matchesaway[j]);
    j++;
  }

  return dataSends;
};

module.exports = { findMatchPlayer };
