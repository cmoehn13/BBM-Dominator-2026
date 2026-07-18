// BBM Dominator Scoring Engine v0.2B


function calculateBBMDominatorScore(player, roster = []) {


let score = 0;


// Base player quality

score += (player.bbmScore || 0) * 0.40;


// Tournament ceiling

score += (player.ceilingScore || 0) * 0.20;


// Playoff upside

score += (player.playoffScore || 0) * 0.15;


// Stack potential

score += (player.stackScore || 0) * 0.15;


// ADP value

score += (player.valueScore || 0) * 0.10;



// Apply roster correlation bonus

score += calculateStackBonus(
player,
roster
);



return Math.round(score * 10) / 10;

}



// Stack bonus engine

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
