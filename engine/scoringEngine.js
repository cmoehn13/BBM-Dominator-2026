// BBM Dominator Scoring Engine v0.2B
//import { DraftState } from "./draftState.js";
//import { buildRecommendation } from "./recommendationPipeline.js";

import {
    calculatePositionNeed
} from "./rosterEngine.js";


//function calculateBBMDominatorScore(player, roster = []) {
//
//    DraftState.roster = roster;
//    const recommendation =
//        buildRecommendation(player, DraftState);
//    return recommendation.dominatorScore;
//}

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

function getRecommendation(player, roster = []) {

    DraftState.roster = roster;

    return buildRecommendation(player, DraftState);

}



// Make scoring engine available to app.js

window.calculateBBMDominatorScore = calculateBBMDominatorScore;
window.getRecommendation = getRecommendation;

