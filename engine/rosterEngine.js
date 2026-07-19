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


// =============================================
// Detect Draft Strategy
// =============================================

function detectDraftStrategy(roster = []) {

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

    const totalPlayers = roster.length;

    // Not enough information yet
    if (totalPlayers < 4) {
        return "Early Draft";
    }

    // Hero RB
    if (counts.RB === 1 && counts.WR >= 3) {
        return "Hero RB";
    }

    // Zero RB
    if (counts.RB <= 1 && counts.WR >= 4) {
        return "Zero RB";
    }

    // Robust RB
    if (counts.RB >= 3 && counts.WR <= 2) {
        return "Robust RB";
    }

    // Elite TE
    if (counts.TE >= 1 && totalPlayers <= 6) {
        return "Elite TE";
    }

    // Balanced
    return "Balanced";

}

window.detectDraftStrategy = detectDraftStrategy;


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

// =============================================
// Calculate Overall Roster Needs
// =============================================
// =============================================
// Calculate Overall Roster Needs
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

    const remaining = {};
    const status = {};

    Object.keys(targets).forEach(position => {

        remaining[position] = Math.max(
            targets[position] - counts[position],
            0
        );

        if (remaining[position] >= 3) {
            status[position] = "High";
        } else if (remaining[position] >= 1) {
            status[position] = "Medium";
        } else {
            status[position] = "Complete";
        }

    });

    return {

        counts,

        targets,

        remaining,

        status

    };

}

window.calculateRosterNeeds = calculateRosterNeeds;



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
window.calculateRosterNeeds = calculateRosterNeeds;
