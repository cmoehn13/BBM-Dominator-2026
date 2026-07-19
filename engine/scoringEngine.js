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



function calculateStackBonus(player, roster){

if(!roster || roster.length === 0){

return 0;

}

let bonus = 0;


roster.forEach(existing => {

if(
player.qbStack &&
existing.name === player.qbStack
){

bonus += 8;

}


if(
existing.qbStack &&
existing.qbStack === player.name
){

bonus += 8;

}

});


return bonus;

}


// Make scoring engine available to app.js

window.calculateBBMDominatorScore = calculateBBMDominatorScore;
window.getRecommendation = getRecommendation;

