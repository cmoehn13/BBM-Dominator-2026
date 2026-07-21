//import { getRecommendation } from "./engine/scoringEngine.js";

//import {
//    calculateRosterNeeds,
//    detectDraftStrategy
//} from "./draftLogic.js";

window.onerror = function (message, source, line, column, error) {

    const area = document.getElementById("recommendations");

    if (area) {
        area.innerHTML = `
            <div style="color:red; font-family:monospace; white-space:pre-wrap;">
ERROR:
${message}

FILE:
${source}

LINE:
${line}

${error && error.stack ? error.stack : ""}
            </div>
        `;
    }

    return false;
};

let players = [];
let roster = [];
let currentRound = 1;
let userDraftSlot = 1;

function getDraftState() {

    return {
        currentRound,
        roster,
        draftBoard: getDraftBoard(),
        userDraftSlot

    };

}

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

loadRoster();
render();

})


.catch(error => {

    console.error(error);

    document.getElementById("recommendations").innerHTML = `
<pre style="color:red;white-space:pre-wrap;">${error.stack || error.message}</pre>
`;
});





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

<button
    class="remove-btn"
    data-name="${encodeURIComponent(player.name)}">
    Remove
</button>



</div>

`

).join("");
    area.querySelectorAll(".remove-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        removePlayer(
            decodeURIComponent(btn.dataset.name)
        );

    });

});

}



// Display recommendations
function renderRecommendations() {

    const area = document.getElementById("recommendations");

    if (!area) return;

const available = players
    .filter(player =>
        !isPlayerDrafted(player.name))
        .map(player =>   getRecommendation(player,getDraftState()))
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 5);
    
        //.filter(player =>
        //    !roster.some(drafted => drafted.name === player.name))

    area.innerHTML = available.map(recommendation => `

        <div class="player">

            <b>${recommendation.player.name}</b><br>

            ${recommendation.player.position} | ${recommendation.player.team}

            <br><br>

            <span class="score">
                Dominator Score:
                <b>${recommendation.totalScore}</b>
            </span>

            <br><br>

            <div class="small">
                BBM Score: ${recommendation.player.bbmScore}
                <br>
                Stack: ${recommendation.player.qbStack || "None"}
            </div>

            <div class="small">
            ${(recommendation.reasons || []).join("<br>")}
                
            </div>

            <br>

            <button class="draft-btn" data-name="${encodeURIComponent(recommendation.player.name)}">
                Draft Player
            </button>


        </div>

    `).join("");

    area.querySelectorAll(".draft-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        draftPlayer(
            decodeURIComponent(btn.dataset.name)
        );

    });

});

 //   area.querySelectorAll(".draft-btn").forEach(btn => {
 //   btn.addEventListener("click", () => {
 //       draftPlayer(
//            decodeURIComponent(btn.dataset.name)
//        );
//    });
//});

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


let targets = players

.filter(player =>

!roster.some(

drafted =>

drafted.name === player.name

)

)


.map(player => {


let bonus = 0;


roster.forEach(existing => {


if(
player.qbStack &&
existing.qbStack === player.qbStack
){

bonus += 5;

}


if(
player.qbStack &&
existing.name === player.qbStack
){

bonus += 10;

}


if(
existing.qbStack &&
existing.qbStack === player.name
){

bonus += 10;

}


});


return {

...player,

stackBonus: bonus

};


})


.filter(player =>

player.stackBonus > 0

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

area.innerHTML = targets.map(player =>

`

<div class="player">

<b>${player.name}</b>

<br>

${player.position}
|
${player.team}

<br>

Stack Bonus:
+${player.stackBonus}

<br><br>
<button
    class="stack-draft-btn"
    data-name="${encodeURIComponent(player.name)}">
    Draft Player
</button>

</div>

`

).join("");
area.querySelectorAll(".stack-draft-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        draftPlayer(
            decodeURIComponent(btn.dataset.name)
        );

    });

});

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

    const draftBoard = getDraftBoard();
    const draftedCount = draftBoard.length;

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

document.getElementById("previousRoundBtn")
    ?.addEventListener("click", previousRound);

document.getElementById("nextRoundBtn")
    ?.addEventListener("click", nextRound);


window.nextRound = nextRound;
window.previousRound = previousRound;

// Start app


