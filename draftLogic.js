// BBM Dominator Draft Logic Engine v0.2C

function calculateRosterNeeds(roster){


let needs = {

QB: 0,
RB: 0,
WR: 0,
TE: 0

};


roster.forEach(player => {


if(player.position === "QB"){
needs.QB++;
}


if(player.position === "RB"){
needs.RB++;
}


if(player.position === "WR"){
needs.WR++;
}


if(player.position === "TE"){
needs.TE++;
}


});


return needs;

}



// Round based tournament adjustments

function calculateRoundAdjustment(player, round){


let bonus = 0;



// Early rounds prioritize elite ceilings

if(round <= 5){


if(player.tier === "Elite"){

bonus += 5;

}


if(player.position === "WR"){

bonus += 2;

}


}



// Middle rounds prioritize stacks

if(round >= 6 && round <= 12){


if(player.qbStack){

bonus += 4;

}


}



// Late rounds prioritize upside

if(round >= 13){


if(player.valueScore >= 90){

bonus += 5;

}


if(player.ceilingScore >= 90){

bonus += 4;

}


}



return bonus;

}



// Position need adjustment

function calculatePositionNeed(player, roster){


const needs =
calculateRosterNeeds(roster);


let bonus = 0;



// Need QB later, not early

if(
player.position === "QB" &&
needs.QB === 0
){

bonus += 2;

}



// RB scarcity

if(
player.position === "RB" &&
needs.RB < 3
){

bonus += 4;

}



// WR heavy BBM preference

if(
player.position === "WR" &&
needs.WR < 5
){

bonus += 5;

}



// TE premium

if(
player.position === "TE" &&
needs.TE === 0
){

bonus += 3;

}



return bonus;

}




function calculateDraftRecommendationScore(
player,
roster,
round
){


let score = 0;



score += calculateBBMDominatorScore(
player,
roster
);



score += calculateRoundAdjustment(
player,
round
);



score += calculatePositionNeed(
player,
roster
);



return Math.round(score * 10) / 10;


}



window.calculateDraftRecommendationScore =
calculateDraftRecommendationScore;


window.calculateRosterNeeds =
calculateRosterNeeds;
