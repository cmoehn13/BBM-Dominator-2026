// =============================================
// BBM Dominator Team Roster Engine
// v0.4
// =============================================

let teamRosters = {};

for (let team = 1; team <= 12; team++) {

    teamRosters[team] = [];

}

function getTeamRoster(team) {

    return teamRosters[team];

}

function addPlayerToTeam(player, team) {

    teamRosters[team].push(player);

}

function getAllTeamRosters() {

    return teamRosters;

}

window.getTeamRoster = getTeamRoster;
window.addPlayerToTeam = addPlayerToTeam;
window.getAllTeamRosters = getAllTeamRosters;
