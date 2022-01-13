//Last Updated: Ben Ray 1/13/22
import * as constants from "../constants/teamConstants";

/* get all teams */
const fetchTeams = async () => {
  try {
    const results = fetch(`${constants.MLB_API_V1}teams?season=2021&sportId=1`);
    return results;
  } catch (err) {
    return `Error: ${err}`;
  }
};

/* get teams roster based on team id */
const fetchTeamRoster = async (teamId) => {
  try {
    const results = fetch(
      `${constants.MLB_API_V1}teams/${teamId}/roster?rosterType=active`
    );
    return results;
  } catch (err) {
    return `Error: ${err}`;
  }
};

/* get player link from player object */
const fetchPlayerLink = async (link) => {
  try {
    const results = fetch(`${constants.MLB_API_BASE_URL}${link}`);
    return results;
  } catch (err) {
    return `Error: ${err}`;
  }
};

const teamService = {
  fetchTeams,
  fetchTeamRoster,
  fetchPlayerLink
};

export default teamService;
