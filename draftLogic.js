// BBM Dominator Draft Logic Engine v0.2C

function calculateRosterNeeds(roster){

    const counts = {
        QB:0,
        RB:0,
        WR:0,
        TE:0
    };

    roster.forEach(player => {

        if(counts[player.position] !== undefined){
            counts[player.position]++;
        }

    });

    return {

        counts,

        targets:{

            QB:3,
            RB:6,
            WR:8,
            TE:3

        },

        needs:{

            QB:Math.max(0,3-counts.QB),

            RB:Math.max(0,6-counts.RB),

            WR:Math.max(0,8-counts.WR),

            TE:Math.max(0,3-counts.TE)

        }

    };

}


function detectDraftStrategy(roster){

    const counts =
        calculateRosterNeeds(roster).counts;

    if(counts.RB <= 1 && counts.WR >= 4){

        return "Zero RB";

    }

    if(counts.RB === 2 && counts.WR >= 3){

        return "Hero RB";

    }

    if(counts.TE >= 2){

        return "Elite TE";

    }

    if(counts.QB === 0 && counts.WR >= 5){

        return "Late QB";

    }

    return "Balanced";

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

    const rosterInfo =
        calculateRosterNeeds(roster);

    const need =
        rosterInfo.needs[player.position];

    switch(need){

        case 3:
            return 10;

        case 2:
            return 7;

        case 1:
            return 4;

        default:
            return 0;

    }

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
roster,
  round
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
