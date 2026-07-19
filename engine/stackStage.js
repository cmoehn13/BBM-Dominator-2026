import { SCORING_WEIGHTS } from "./constants.js";

export function processStack(recommendation, draftState) {

    const player = recommendation.player;

    let rawStack = player.stackScore ?? 0;

    let stackBonus = 0;

    draftState.roster.forEach(existing => {

        if (
            player.qbStack &&
            existing.name === player.qbStack
        ) {
            stackBonus += 8;
        }

        if (
            existing.qbStack &&
            existing.qbStack === player.name
        ) {
            stackBonus += 8;
        }

    });

    const contribution =
        rawStack * SCORING_WEIGHTS.stack + stackBonus;

    recommendation.breakdown.stack = {

        raw: rawStack,

        stackBonus,

        weight: SCORING_WEIGHTS.stack,

        contribution

    };

    recommendation.dominatorScore += contribution;

    if (stackBonus > 0) {

        recommendation.reasons.push(
            "Completes existing stack"
        );

    }

    return recommendation;

}
