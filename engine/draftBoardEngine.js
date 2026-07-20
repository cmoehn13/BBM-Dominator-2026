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

function getDraftBoard() {

    return draftBoard;

}

function clearDraftBoard() {

    draftBoard = [];

}

function getOverallPick() {

    return draftBoard.length + 1;

}

window.recordDraftPick = recordDraftPick;
window.getDraftBoard = getDraftBoard;
window.clearDraftBoard = clearDraftBoard;
window.getOverallPick = getOverallPick;
