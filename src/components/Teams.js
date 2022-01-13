//Last Updated: Ben Ray 1/13/22
import React, { Component } from "react";

import "../styles/teams.css";
import PlayerModal from "./PlayerModal";
import teamServices from "../services/teamServices";

// We want this component to go get the teams from MLB's Stats API
// the request is a GET to `https://statsapi.mlb.com/api/v1/teams?season=2021&sportId=1`
// From there we want to display each team and the members of each team
// To get the members of each team we can call the stats API with the team ID
// GET to `http://statsapi.mlb.com/api/v1/teams/{teamId}/roster?rosterType=active`

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      alEast: [],
      alCentral: [],
      alWest: [],
      nlEast: [],
      nlCentral: [],
      nlWest: [],
      roster: [],
      team: "",
      showPlayers: false
    };
  }

  componentDidMount = () => {
    teamServices
      .fetchTeams()
      .then((res) => res.json())
      .then((result) => {
        return result;
      })
      .then(
        (result) => {
          this.setState({
            teams: result.teams,
            alEast: this._sortDivision(result, "American League East"),
            alCentral: this._sortDivision(result, "American League Central"),
            alWest: this._sortDivision(result, "American League West"),
            nlEast: this._sortDivision(result, "National League East"),
            nlCentral: this._sortDivision(result, "National League Central"),
            nlWest: this._sortDivision(result, "National League West")
          });
        },

        (error) => {}
      );
  };

  render = () => {
    const {
      roster,
      alEast,
      alCentral,
      alWest,
      nlEast,
      nlCentral,
      nlWest,
      showPlayers,
      team
    } = this.state;
    return (
      <>
        <PlayerModal
          isVisible={showPlayers ? "visible" : "hidden"}
          players={roster}
          team={team}
          closePlayerModal={this._closePlayerModal}
        />

        <div className="teams-table">
          <div className="american-league">
            <h3>American League</h3>
            <h4>East</h4>
            {alEast.map((team, i) => (
              <div
                className="team-name"
                key={i}
                onClick={() => this._getPlayersForTeam(team)}
              >
                {team.name}
              </div>
            ))}
            <h4>Central</h4>
            {alCentral.map((team, i) => (
              <div
                className="team-name"
                key={i}
                onClick={() => this._getPlayersForTeam(team)}
              >
                {team.name}
              </div>
            ))}
            <h4>West</h4>
            {alWest.map((team, i) => (
              <div
                className="team-name"
                key={i}
                onClick={() => this._getPlayersForTeam(team)}
              >
                {team.name}
              </div>
            ))}
          </div>
          <div className="national-league">
            <h3>National League</h3>
            <h4>East</h4>
            {nlEast.map((team, i) => (
              <div
                className="team-name"
                key={i}
                onClick={() => this._getPlayersForTeam(team)}
              >
                {team.name}
              </div>
            ))}
            <h4>Central</h4>
            {nlCentral.map((team, i) => (
              <div
                className="team-name"
                key={i}
                onClick={() => this._getPlayersForTeam(team)}
              >
                {team.name}
              </div>
            ))}
            <h4>West</h4>
            {nlWest.map((team, i) => (
              <div
                className="team-name"
                key={i}
                onClick={() => this._getPlayersForTeam(team)}
              >
                {team.name}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  _getPlayersForTeam = (team) => {
    teamServices
      .fetchTeamRoster(team.id)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            roster: result.roster,
            team: team.name,
            showPlayers: true
          });
        },

        (error) => {
          console.log(error);
        }
      );
  };

  _sortDivision = (result, division) => {
    const divisionTeams = result.teams.filter(
      (team) => team.division.name === division
    );
    const sortedDivisionTeams = divisionTeams.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    return sortedDivisionTeams;
  };

  _closePlayerModal = () => {
    this.setState({
      showPlayers: false
    });
  };
}

export default Teams;
