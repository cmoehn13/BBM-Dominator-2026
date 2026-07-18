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


return {

...player,

dominatorScore:

calculateBBMDominatorScore(

player,

roster

)

};


})


.sort(

(a,b)=>

b.dominatorScore -

a.dominatorScore

)


.slice(0,5);



area.innerHTML = available.map(player =>


`

<div class="player">

<b>${player.name}</b>

<br>

${player.position}
|
${player.team}


<br>


<span class="score">

Dominator Score:
${player.dominatorScore}

</span>


<br>


<div class="small">

BBM:
${player.bbmScore}

<br>

Stack:
${player.qbStack || "None"}

</div>


<button onclick="window.draftPlayer('${player.name}')">

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

<button onclick="window.draftPlayer('${player.name}')">
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

renderStackRecommendations();

}


window.draftPlayer = draftPlayer;
window.removePlayer = removePlayer;

// Start app

loadRoster();

render();

