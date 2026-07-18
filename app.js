let players = [];

let roster = [];


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

<button onclick="removePlayer('${player.name}')">

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


const available =

players

.filter(player =>

!roster.some(
r =>
r.name === player.name
)

)

.sort(

(a,b)=>

calculateBBMDominatorScore(
b,
roster
)

-

calculateBBMDominatorScore(
a,
roster
)

)

.slice(0,25);



area.innerHTML =


available.map(player =>

`

<div class="player">

<b>${player.name}</b>

<br>

${player.position}
|
${player.team}

<br>

<span class="score">

BBM Score:
${player.bbmScore}

</span>


<br>

<div class="small">

Stack:
${player.qbStack}

</div>

<br>


<button onclick="draftPlayer('${player.name}')">

Draft Player

</button>


</div>

`

).join("");

}



// Refresh screen

function render(){

renderRoster();

renderRecommendations();

}



// Start app

loadRoster();

render();
