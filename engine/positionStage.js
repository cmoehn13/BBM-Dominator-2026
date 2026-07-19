// =========================================
// BBM Dominator
// Position Stage
// =========================================

import { SCORING_WEIGHTS } from "./constants.js";
import { calculateRosterNeeds } from "../draftLogic.js";

export function processPosition(recommendation, draftState) {

    const rosterInfo = calculateRosterNeeds(draftState.roster);

    const position = recommendation.player.position;

    const rawNeed = rosterInfo.needs[position] || 0;

    const contribution =
        rawNeed * SCORING_WEIGHTS.positionNeed;

    recommendation.breakdown.positionNeed = {

        raw: rawNeed,

        weight: SCORING_WEIGHTS.positionNeed,

        contribution

    };

    recommendation.dominatorScore += contribution;

    if (rawNeed >= 2) {

        recommendation.reasons.push(
            `Roster needs ${position}`
        );

    }

    return recommendation;

}
