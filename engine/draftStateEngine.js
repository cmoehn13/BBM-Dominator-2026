// =============================================
// BBM Dominator Draft State Engine
// v0.4
// =============================================

let draftState = {
    currentRound: 1,
    overallPick: 1,
    currentTeam: 1,
    userDraftSlot: 1
};

function getDraftState() {
    return draftState;
}

function setUserDraftSlot(slot) {
    draftState.userDraftSlot = slot;
}

function getCurrentRound() {
    return draftState.currentRound;
}

function getCurrentTeam() {
    return draftState.currentTeam;
}

function getOverallPick() {
    return draftState.overallPick;
}

function calculateTeamForPick(overallPick) {
    const round = Math.ceil(overallPick / 12);
    const pickInRound = ((overallPick - 1) % 12) + 1;
    if (round % 2 === 1) {
        return pickInRound;
    }
    return 13 - pickInRound;
}

window.calculateTeamForPick = calculateTeamForPick;
window.getDraftState = getDraftState;
window.setUserDraftSlot = setUserDraftSlot;
window.getCurrentRound = getCurrentRound;
window.getCurrentTeam = getCurrentTeam;
window.getOverallPick = getOverallPick;
