// =============================================
// BBM Dominator Draft Board Engine
// v0.3.3
// =============================================

let draftBoard = [];

function recordDraftPick(player, team, round, overallPick) {

    draftBoard.push({

        player,

        team,

        round,

        overallPick

    });

}

function isPlayerDrafted(playerName) {

    return draftBoard.some(
        pick => pick.player.name === playerName
    );

}

function getLastPick() {

    if (draftBoard.length === 0) return null;

    return draftBoard[draftBoard.length - 1];

}



function getDraftBoard() {

    return draftBoard;

}

function clearDraftBoard() {

    draftBoard = [];

}

function getOverallPick() {

    return draftBoard.length + 1;

}

window.getLastPick = getLastPick;
window.recordDraftPick = recordDraftPick;
window.getDraftBoard = getDraftBoard;
window.clearDraftBoard = clearDraftBoard;
window.getOverallPick = getOverallPick;
window.isPlayerDrafted = isPlayerDrafted;
