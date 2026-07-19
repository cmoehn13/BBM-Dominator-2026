// =========================================
// BBM Dominator
// Constants
// Version 0.3.2
// =========================================

// DraftKings Best Ball roster construction targets
export const ROSTER_TARGETS = {
    QB: {
        min: 2,
        ideal: 3,
        max: 3
    },
    RB: {
        min: 5,
        ideal: 6,
        max: 7
    },
    WR: {
        min: 7,
        ideal: 8,
        max: 9
    },
    TE: {
        min: 2,
        ideal: 3,
        max: 3
    }
};

export const POSITION_PRIORITY = {

    QB: 1,

    RB: 2,

    WR: 3,

    TE: 4

};

// Draft phases
export const DRAFT_PHASES = {
    EARLY: {
        start: 1,
        end: 6
    },
    MIDDLE: {
        start: 7,
        end: 12
    },
    LATE: {
        start: 13,
        end: 18
    },
    ENDGAME: {
        start: 19,
        end: 20
    }
};

// Default scoring weights
// These will eventually become user-configurable.
export const SCORING_WEIGHTS = {

    projection: 0.40,

    ceiling: 0.20,

    positionNeed: 1.00,

    stack: 0.15,

    playoff: 0.15,

    adp: 0.10

};

// Recommendation confidence thresholds
export const CONFIDENCE = {

    HIGH: 90,

    MEDIUM: 75,

    LOW: 60

};

// Future-proofing for contest types
export const CONTESTS = {

    DK_BBM: {
        name: "DraftKings Best Ball Million",
        rosterSize: 20,
        playoffWeeks: [15, 16, 17]
    }

};
