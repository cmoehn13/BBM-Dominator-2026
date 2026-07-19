// =========================================
// BBM Dominator
// Recommendation Factory
// Version 0.3.2
// =========================================

export function createRecommendation(player) {

    return {

        player,

        dominatorScore: 0,

        confidence: 0,

        recommendation: "Consider",

        reasons: [],

        warnings: [],

        breakdown: {

            projection: 0,

            ceiling: 0,

            positionNeed: 0,

            stack: 0,

            playoff: 0,

            adp: 0,

            leverage: 0

        }

    };

}
