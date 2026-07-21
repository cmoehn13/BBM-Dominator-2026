// =============================================
// BBM Dominator Draft Logic Engine
// v0.3.2 Stabilization Release
// =============================================

function calculateRosterNeeds(roster = []) {

    const counts = {
        QB: 0,
        RB: 0,
        WR: 0,
        TE: 0
    };

    roster.forEach(player => {

        if (counts[player.position] !== undefined) {
            counts[player.position]++;
        }

    });

    const targets = {
        QB: 3,
        RB: 6,
        WR: 8,
        TE: 3
    };

    return {

        counts,

        targets,

        needs: {

            QB: Math.max(0, targets.QB - counts.QB),
            RB: Math.max(0, targets.RB - counts.RB),
            WR: Math.max(0, targets.WR - counts.WR),
            TE: Math.max(0, targets.TE - counts.TE)

        }

    };

}


// Draft a player
//function draftPlayer(name) {
//const player =
//players.find(
//p => p.name === name
//);
//
//if (!player) return;
//roster.push(player);
//recordDraftPick(
//    player,
//    userDraftSlot,
//    currentRound,
//    getOverallPick()
//);
//
//saveRoster();
//render();
//}

function draftPlayer(name) {
    draftPlayerForTeam(name,userDraftSlot);
}

function removePlayer(name) {
    roster = roster.filter(
    player => player.name !== name);
    saveRoster();
    render();
}


function draftPlayerForTeam(name, team) {
    const player = players.find(
        p => p.name === name
    );

    if (!player) return;
    processDraftPick(player, team);
    render();
}

function processDraftPick(player, team) {
    addPlayerToTeam(player, team);

    recordDraftPick(
        player,
        team,
        currentRound,
        getOverallPick()
    );

    if (team === userDraftSlot) {
        roster = getTeamRoster(userDraftSlot);
        saveRoster();
    }

    advanceDraft();
}

function detectDraftStrategy(roster = []) {

    const counts =
        calculateRosterNeeds(roster).counts;

    if (counts.RB <= 1 && counts.WR >= 4)
        return "Zero RB";

    if (counts.RB === 2 && counts.WR >= 3)
        return "Hero RB";

    if (counts.TE >= 2)
        return "Elite TE";

    if (counts.QB === 0 && counts.WR >= 5)
        return "Late QB";

    return "Balanced";

}

function calculateRoundAdjustment(player, round) {

    let bonus = 0;

    if (round <= 5) {

        if (player.tier === "Elite")
            bonus += 5;

        if (player.position === "WR")
            bonus += 2;

    }

    if (round >= 6 && round <= 12) {

        if (player.qbStack)
            bonus += 4;

    }

    if (round >= 13) {

        if ((player.valueScore || 0) >= 90)
            bonus += 5;

        if ((player.ceilingScore || 0) >= 90)
            bonus += 4;

    }

    return bonus;

}

function calculatePositionNeed(player, roster) {

    const needs =
        calculateRosterNeeds(roster).needs;

    switch (needs[player.position]) {

        case 3:
            return 10;

        case 2:
            return 7;

        case 1:
            return 4;

        default:
            return 0;

    }

}

function calculateDraftRecommendationScore(
    player,
    roster,
    round
) {

    let score =
        calculateBBMDominatorScore(player, roster);

    score +=
        calculateRoundAdjustment(player, round);

    score +=
        calculatePositionNeed(player, roster);

    return Math.round(score * 10) / 10;

}

// =============================================
// Global exports
// =============================================
window.draftPlayer = draftPlayer;
window.removePlayer = removePlayer;

window.calculateRosterNeeds =
    calculateRosterNeeds;

window.detectDraftStrategy =
    detectDraftStrategy;

window.calculateRoundAdjustment =
    calculateRoundAdjustment;

window.calculatePositionNeed =
    calculatePositionNeed;

window.calculateDraftRecommendationScore =
    calculateDraftRecommendationScore;
