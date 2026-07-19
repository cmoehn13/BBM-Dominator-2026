// ==============================
// BBM Dominator Roster Engine
// Version 0.3
// ==============================

const TARGETS = {
    QB: { min: 2, ideal: 3 },
    RB: { min: 5, ideal: 6 },
    WR: { min: 7, ideal: 9 },
    TE: { min: 2, ideal: 3 }
};

function getRosterCounts(roster) {

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

    return counts;
}

function getDraftPhase(round) {

    if (round <= 6) return "EARLY";
    if (round <= 12) return "MIDDLE";
    if (round <= 18) return "LATE";

    return "ENDGAME";
}

function detectStrategy(roster) {

    const counts = getRosterCounts(roster);

    if (counts.RB <= 1 && counts.WR >= 4)
        return {
            strategy: "Zero RB",
            confidence: 92
        };

    if (counts.RB === 2 && counts.WR >= 3)
        return {
            strategy: "Hero RB",
            confidence: 87
        };

    if (counts.TE >= 2 && counts.WR >= 3)
        return {
            strategy: "Elite TE",
            confidence: 80
        };

    if (counts.QB === 0 && counts.WR >= 5)
        return {
            strategy: "Late QB",
            confidence: 91
        };

    return {
        strategy: "Balanced",
        confidence: 70
    };
}

 function calculatePositionNeed(player, roster) {

    const counts = {
        QB: 0,
        RB: 0,
        WR: 0,
        TE: 0
    };

    roster.forEach(p => {
        counts[p.position]++;
    });

    switch (player.position) {

        case "QB":
            return counts.QB < 2 ? 8 : counts.QB < 3 ? 4 : 0;

        case "RB":
            return counts.RB < 5 ? 8 : counts.RB < 7 ? 4 : 0;

        case "WR":
            return counts.WR < 7 ? 8 : counts.WR < 9 ? 4 : 0;

        case "TE":
            return counts.TE < 2 ? 8 : counts.TE < 3 ? 4 : 0;

        default:
            return 0;
    }
}

function calculateRosterNeed(roster) {

    const counts = getRosterCounts(roster);

    const needs = {};

    Object.keys(TARGETS).forEach(position => {

        const target = TARGETS[position].ideal;

        let value = Math.max(0, target - counts[position]);

        needs[position] = value * 5;

    });

    return needs;
}


function getRosterSummary(roster, round) {

    return {

        counts: getRosterCounts(roster),

        strategy: detectStrategy(roster),

        needs: calculatePositionNeed(roster),

        phase: getDraftPhase(round)

    };

}

window.calculatePositionNeed = calculatePositionNeed;
window.getRosterSummary = getRosterSummary;
window.calculateRosterNeed = calculateRosterNeed;
