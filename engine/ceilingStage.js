// =========================================
// BBM Dominator
// Ceiling Stage
// =========================================

import { SCORING_WEIGHTS } from "./constants.js";

export function processCeiling(recommendation) {

    const player = recommendation.player;

    const rawCeiling = player.ceilingScore ?? 0;

    const weightedCeiling =
        rawCeiling * SCORING_WEIGHTS.ceiling;

    recommendation.breakdown.ceiling = {

        raw: rawCeiling,

        weight: SCORING_WEIGHTS.ceiling,

        contribution: weightedCeiling

    };

    recommendation.dominatorScore += weightedCeiling;

    if (rawCeiling >= 95) {

        recommendation.reasons.push("Elite tournament ceiling");

    }

    return recommendation;

}
