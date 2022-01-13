// Last Updated: Ben Ray 1/13/22

import teamServices from "../services/teamServices";

// test Teams API
test("Number of teams is 30", () => {
  return teamServices
    .fetchTeams()
    .then((res) => res.json())
    .then((data) => {
      expect(data.teams.length).toBe(30);
    });
});

// test Team Roster API
test("Red Sox roster contains Alex Verdugo", () => {
  return teamServices
    .fetchTeamRoster(111)
    .then((res) => res.json())
    .then((data) => {
      const player = data.roster.filter(
        (x) => x.person.fullName === "Alex Verdugo"
      );
      expect(player.length).toBe(1);
    });
});

test("Giants have 30 players", () => {
  return teamServices
    .fetchTeamRoster(117)
    .then((res) => res.json())
    .then((data) => {
      expect(data.roster.length).toBe(39);
    });
});
