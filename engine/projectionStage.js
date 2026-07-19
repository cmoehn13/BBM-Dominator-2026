// =========================================
// BBM Dominator
// Projection Stage
// =========================================

import { SCORING_WEIGHTS } from "./constants.js";

export function processProjection(recommendation) {

    const player = recommendation.player;

    const rawProjection = player.bbmScore ?? 0;

    const weightedProjection =
        rawProjection * SCORING_WEIGHTS.projection;

    recommendation.breakdown.projection = {

        raw: rawProjection,

        weight: SCORING_WEIGHTS.projection,

        contribution: weightedProjection

    };

    recommendation.dominatorScore += weightedProjection;

    if (rawProjection >= 95) {

        recommendation.reasons.push("Elite projection");

    } else if (rawProjection >= 90) {

        recommendation.reasons.push("Strong projection");

    }

    return recommendation;

}
