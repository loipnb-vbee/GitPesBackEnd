const matchDaos = require('../daos/match');

const getRankPlayer = async () => {
  const dataMatch = await matchDaos.findAllMatches(true);
  const groupByTeam = dataMatch.reduce((result, match) => {
    const homeTeam = match.homeId;
    const awayTeam = match.awayId;
    const homeScore = match.homeScore;
    const awayScore = match.awayScore;
    const groupStage = match.groupStage;

    // If the home team does not exist in the result object yet, create an initial object for it
    if (!result[homeTeam]) {
      result[homeTeam] = {
        groupStage,
        name: homeTeam.name,
        img: homeTeam.image || '',
        p: 0,
        w: 0,
        d: 0,
        l: 0,
        gd: 0,
        pts: 0,
        IdMatchs: [],
      };
    }

    // If the away team does not exist in the result object yet, create an initial object for it
    if (!result[awayTeam]) {
      result[awayTeam] = {
        groupStage,
        name: awayTeam.name,
        img: awayTeam.image || '',
        p: 0,
        w: 0,
        d: 0,
        l: 0,
        gd: 0,
        pts: 0,
        IdMatchs: [],
      };
    }
    // Update the home and away team's stats based on the match result
    result[homeTeam].p += 1;
    result[awayTeam].p += 1;
    result[homeTeam].IdMatchs.push(match.index);
    result[awayTeam].IdMatchs.push(match.index);

    if (homeScore > awayScore) {
      result[homeTeam].w += 1;
      result[homeTeam].pts += 3;
      result[awayTeam].l += 1;
      result[homeTeam].gd += homeScore - awayScore;
      result[awayTeam].gd += awayScore - homeScore;
    } else if (homeScore === awayScore) {
      result[homeTeam].d += 1;
      result[awayTeam].d += 1;
      result[homeTeam].pts += 1;
      result[awayTeam].pts += 1;
    } else {
      result[awayTeam].w += 1;
      result[awayTeam].pts += 3;
      result[homeTeam].l += 1;
      result[homeTeam].gd += homeScore - awayScore;
      result[awayTeam].gd += awayScore - homeScore;
    }

    return result;
  }, {});

  const tableData = Object.values(groupByTeam).sort(
    (teamA, teamB) => teamB.Pts - teamA.Pts || teamB.gd - teamA.gd,
  );

  // Add rank to each team based on their position in the tableData array
  tableData.forEach((team, index) => {
    team.rank = index + 1;
  });

  return tableData;
};
module.exports = { getRankPlayer };
