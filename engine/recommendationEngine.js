// =============================================
// BBM Dominator Recommendation Engine
// v0.3.3
// =============================================

function getRecommendation(player, roster = [], round = 1) {

    const baseScore =
        calculateBBMDominatorScore(player, roster);

    const positionNeed =
        calculatePositionNeed(player, roster);

    const roundBonus =
        calculateRoundAdjustment(player, round);

    const totalScore =
        Math.round(
            (baseScore + positionNeed + roundBonus) * 10
        ) / 10;

    const reasons = [];

    if ((player.ceilingScore || 0) >= 95)
        reasons.push("Elite tournament ceiling");

    if ((player.playoffScore || 0) >= 90)
        reasons.push("Strong Weeks 15–17 playoff profile");

    if (positionNeed >= 7)
        reasons.push("Fills a major roster need");

    if (player.qbStack)
        reasons.push(`Stacks with ${player.qbStack}`);

    if ((player.valueScore || 0) >= 90)
        reasons.push("Positive ADP value");

    return {

        player,

        totalScore,

        breakdown: {

            baseScore,

            positionNeed,

            roundBonus

        },

        reasons

    };

}

window.getRecommendation =
    getRecommendation;
