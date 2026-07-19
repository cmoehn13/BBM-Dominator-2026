// BBM Dominator Scoring Engine v0.2B
import { DraftState } from "./draftState.js";
import { buildRecommendation } from "./recommendationPipeline.js";

import {
    calculatePositionNeed
} from "./rosterEngine.js";


function calculateBBMDominatorScore(player, roster = []) {

    DraftState.roster = roster;

    const recommendation =
        buildRecommendation(player, DraftState);

    return recommendation.dominatorScore;

}

function getRecommendation(player, roster = []) {

    DraftState.roster = roster;

    return buildRecommendation(player, DraftState);

}



// Make scoring engine available to app.js

window.calculateBBMDominatorScore = calculateBBMDominatorScore;
window.getRecommendation = getRecommendation;

