import { SCORING_WEIGHTS } from "./constants.js";

export function processValue(recommendation) {

    const rawValue =
        recommendation.player.valueScore ?? 0;

    const contribution =
        rawValue * SCORING_WEIGHTS.value;

    recommendation.breakdown.value = {

        raw: rawValue,

        weight: SCORING_WEIGHTS.value,

        contribution

    };

    recommendation.dominatorScore += contribution;

    if (rawValue >= 90) {

        recommendation.reasons.push(
            "Strong ADP value"
        );

    }

    return recommendation;

}
