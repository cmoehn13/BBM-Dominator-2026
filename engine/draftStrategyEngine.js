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

window.calculateRoundAdjustment = calculateRoundAdjustment;
