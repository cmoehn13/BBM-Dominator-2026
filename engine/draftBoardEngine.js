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

window.recordDraftPick = recordDraftPick;
window.getDraftBoard = getDraftBoard;
