// =============================================
// BBM Dominator Draft Strategy Engine
// v0.3.3
// =============================================

function calculateRoundAdjustment(player, round) {

    // Placeholder implementation.
    // Will become more sophisticated in future versions.

    if (round <= 2) {

        if (player.position === "QB") return -5;
        if (player.position === "TE") return -2;

    }

    if (round >= 8) {

        if (player.position === "QB") return 3;

    }

    return 0;

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
window.calculateRoundAdjustment = calculateRoundAdjustment;
