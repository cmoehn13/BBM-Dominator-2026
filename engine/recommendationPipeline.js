// =========================================
// BBM Dominator
// Recommendation Pipeline
// =========================================

import { createRecommendation } from "./recommendationFactory.js";

import { processProjection } from "./projectionStage.js";
import { processCeiling } from "./ceilingStage.js";
import { processPosition } from "./positionStage.js";

// Future stages
// import { processStack } from "./stackStage.js";
// import { processPlayoff } from "./playoffStage.js";
// import { processValue } from "./valueStage.js";

export function buildRecommendation(player, draftState) {

    let recommendation = createRecommendation(player);

    recommendation = processProjection(recommendation);

    recommendation = processCeiling(recommendation);

    recommendation = processPosition(recommendation, draftState);

    // recommendation = processStack(recommendation, draftState);
    // recommendation = processPlayoff(recommendation, draftState);
    // recommendation = processValue(recommendation);

    recommendation.confidence = calculateConfidence(recommendation);

    recommendation.dominatorScore = Number(
        recommendation.dominatorScore.toFixed(2)
    );

    return recommendation;
}

function calculateConfidence(recommendation) {

    let confidence = 50;

    if (recommendation.breakdown.projection.raw >= 90)
        confidence += 20;

    if (recommendation.breakdown.ceiling.raw >= 90)
        confidence += 20;

    confidence += Math.min(
        recommendation.reasons.length * 2,
        10
    );

    return Math.min(confidence, 99);
}
