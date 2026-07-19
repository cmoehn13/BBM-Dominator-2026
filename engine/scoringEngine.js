// =========================================
// BBM Dominator Scoring Engine
// v0.3.2 Stabilization
// =========================================

function calculateBBMDominatorScore(player, roster = []) {

    let score = 0;

    score += (player.bbmScore || 0) * 0.40;
    score += (player.ceilingScore || 0) * 0.20;
    score += (player.playoffScore || 0) * 0.15;
    score += (player.stackScore || 0) * 0.15;
    score += (player.valueScore || 0) * 0.10;

    score += calculateStackBonus(player, roster);

    return Math.round(score * 10) / 10;
}

function calculateStackBonus(player, roster = []) {

    if (!roster || roster.length === 0) {
        return 0;
    }

    let bonus = 0;

    roster.forEach(existing => {

        if (
            player.qbStack &&
            existing.name === player.qbStack
        ) {
            bonus += 8;
        }

        if (
            existing.qbStack &&
            existing.qbStack === player.name
        ) {
            bonus += 8;
        }

    });

    return bonus;
}

window.calculateBBMDominatorScore = calculateBBMDominatorScore;
