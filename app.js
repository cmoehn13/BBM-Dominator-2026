let players = [];

let roster = [];

let currentRound = 1;

// Load player database

fetch("./players.json")

.then(response => {

if (!response.ok) {

throw new Error("Could not load players.json");

}

return response.json();

})

.then(data => {

players = data;

renderRecommendations();

})

.catch(error => {

console.error(error);

document.getElementById("recommendations").innerHTML =
"Unable to load player database.";

});



// Draft a player

function draftPlayer(name) {


const player =
players.find(
p => p.name === name
);


if (!player) return;


roster.push(player);


saveRoster();


render();

}


function removePlayer(name) {


roster = roster.filter(

player =>

player.name !== name

);


saveRoster();


render();


}


// Save roster locally

function saveRoster(){

localStorage.setItem(
"bbmRoster",
JSON.stringify(roster)
);

}



// Load previous draft

function loadRoster(){

const saved =
localStorage.getItem("bbmRoster");


if(saved){

roster =
JSON.parse(saved);

}

}



// Display roster

function renderRoster(){


const area =
document.getElementById("roster");


if(roster.length === 0){

area.innerHTML =
"No players drafted yet.";

return;

}


area.innerHTML =

roster.map(player =>

`

<div class="player">

<b>${player.name}</b>

<br>

<span class="position">
${player.position}
</span>

-
${player.team}

<br>

<div class="small">

Stack:
${player.qbStack || "None"}

</div>


<br>

<button onclick="window.removePlayer('${player.name}')">

Remove

</button>


</div>

`

).join("");

}



// Display recommendations

function renderRecommendations(){


const area =
document.getElementById("recommendations");


if(!area) return;


const available = players

.filter(player =>

!roster.some(

drafted =>

drafted.name === player.name

)

)

.map(player => {

    return getRecommendation(
        player,
        roster
    );

})


.sort(

(a,b)=>

b.dominatorScore -

a.dominatorScore

)


.slice(0,5);



area.innerHTML = available.map(recommendation =>


`

<div class="player">

<b>${recommendation.player.name}</b>

<br>

${recommendation.player.position}
|
${recommendation.player.team}


<br>


<span class="score">

Dominator Score:
${recommendation.player.dominatorScore}

<div class="small">

Why:

<ul>

${recommendation.reasons
    .map(reason => `<li>${reason}</li>`)
    .join("")}

</ul>

</div>

</span>


<br>


<div class="small">

BBM:
${recommendation.player.bbmScore}

<br>

Stack:
${recommendation.player.qbStack || "None"}

</div>


<button onclick="window.draftPlayer('${recommendation.player.name}')">

Draft Player

</button>


</div>


`

).join("");

}

function renderStackRecommendations(){


const area =
document.getElementById("stackRecommendations");


if(!area) return;


if(roster.length === 0){

area.innerHTML =
"Draft a player to generate stack targets.";

return;

}


let targets = recommendation.players

.filter(recommenation.player =>

!roster.some(

drafted =>

drafted.name === recommendation.player.name

)

)


.map(recommendation.player => {


let bonus = 0;


roster.forEach(existing => {


if(
recommendation.player.qbStack &&
existing.qbStack === recommednation.player.qbStack
){

bonus += 5;

}


if(
recommendation.player.qbStack &&
existing.name === recommendation.player.qbStack
){

bonus += 10;

}


if(
existing.qbStack &&
existing.qbStack === recommendation.player.name
){

bonus += 10;

}


});


return {

...recommednation.player,

stackBonus: bonus

};


})


.filter(recommendation.player =>

recommendation.player.stackBonus > 0

)


.sort(

(a,b)=>

b.stackBonus -

a.stackBonus

)


.slice(0,5);



if(targets.length === 0){

area.innerHTML =
"No stack targets available.";

return;

}

area.innerHTML = targets.map(recommendation.player =>

`

<div class="player">

<b>${recommendation.player.name}</b>

<br>

${recommendation.player.position}
|
${recommendation.player.team}

<br>

Stack Bonus:
+${recommendaiton.player.stackBonus}

<br><br>

<button onclick="window.draftPlayer('${recommendation.player.name}')">
Draft Player
</button>

</div>

`

).join("");


}


function nextRound(){

currentRound++;

const roundDisplay =
document.getElementById("currentRound");

if(roundDisplay){

roundDisplay.innerHTML =
currentRound;

}

render();

}

function previousRound(){

if(currentRound > 1){

currentRound--;

}


const roundDisplay =
document.getElementById("currentRound");


if(roundDisplay){

roundDisplay.innerHTML =
currentRound;

}


render();

}


function renderDraftIntelligence(){

    const info =
        calculateRosterNeeds(roster);

    const strategy =
        detectDraftStrategy(roster);

    const panel =
        document.getElementById("draftIntelligence");

    if(!panel) return;

    panel.innerHTML = `

        <b>Strategy</b>

        <br>

        ${strategy}

        <hr>

        QB: ${info.counts.QB}/3

        <br>

        RB: ${info.counts.RB}/6

        <br>

        WR: ${info.counts.WR}/8

        <br>

        TE: ${info.counts.TE}/3

    `;

}

// Refresh screen

function render(){

renderRoster();

renderRecommendations();

renderStackRecommendations();

renderDraftIntelligence();  

}


window.draftPlayer = draftPlayer;
window.removePlayer = removePlayer;
window.nextRound = nextRound;
window.previousRound = previousRound;

// Start app

loadRoster();

render();

