var levelsData = [
    {
        name: "intro",
        type: "intro",
        music: "./music/intro.mp3",
        started: false,
        completed: false,

    },
    {
        name: "characterSel",
        type: "character",
        music: "./music/coin.mp3",
        started: false,
        completed: false,
    },
    {
        name: "transition1",
        type: "transition",
        music: "./music/transition.mp3",
        started: false,
        completed: false,
        content: {
            stageNumber: "STAGE 1",
            stageName: "DOWNTOWN SPRINGFIELD",
        }

    },
    {
        name: "level1",
        type: "level",
        music: "./music/level1.mp3",
        bg: "./images/bgSimpsons1.png",
        started: false,
        completed: false,
        content: [
            {
                name: "sector1",
                location: 400,
                enemies: [
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                ],
                completed: false,
                spawned: false,

            },

            {
                name: "sector2",
                location: 1500,
                enemies: [
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    }
                ],
                completed: false,
                spawned: false,

            },
            {
                name: "sector3",
                location: 2400,
                enemies: [
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy2",
                        location: undefined,
                    }
                ],
                completed: false,
                spawned: false,

            },

            {
                name: "sector4",
                location: 3400,
                enemies: [
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy2",
                        location: undefined,
                    }
                ],
                completed: false,
                spawned: false,

            },

            {
                name: "boss",
                location: 5100,
                enemies: [
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy3",
                        location: undefined,
                    }
                ],
                completed: false,
                spawned: false,

            },
        ]

    },
    {
        name: "transition2",
        type: "transition",
        music: "./music/transition.mp3",
        started: false,
        completed: false,
        content: {
            stageNumber: "BONUS",
            stageName: "    BLOW THE BALLOON",
        }

    },
    {
        name: "minigame1",
        type: "minigame",
        music: "./music/bonus1.mp3",
        started: false,
        completed: false,

    },
    {
        name: "transition3",
        type: "transition",
        music: "./music/transition.mp3",
        started: false,
        completed: false,
        content: {
            stageNumber: "STAGE 2",
            stageName: "            KRUSTYLAND",
        }


    },
    {
        name: "level2",
        type: "level",
        music: "./music/krustyland.mp3",
        bg: "./images/bgSimpsons2.png",
        started: false,
        completed: false,
        content: [
            {
                name: "sector1",
                location: 200,
                enemies: [
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                ],
                completed: false,
                spawned: false,

            },

            {
                name: "sector2",
                location: 1000,
                enemies: [
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    }
                ],
                completed: false,
                spawned: false,

            },
            {
                name: "sector3",
                location: 1800,
                enemies: [
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy2",
                        location: undefined,
                    }
                ],
                completed: false,
                spawned: false,

            },
            {
                name: "sector4",
                location: 3800,
                enemies: [
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy2",
                        location: undefined,
                    }
                ],
                completed: false,
                spawned: false,

            },

            {
                name: "boss",
                location: 5000,
                enemies: [
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy1",
                        location: undefined,
                    },
                    {
                        class: "Enemy2",
                        location: undefined,
                    },
                    {
                        class: "Enemy2",
                        location: undefined,
                    },
                    {
                        class: "Enemy2",
                        location: undefined,
                    },
                    {
                        class: "Enemy4",
                        location: undefined,
                    }
                ],
                completed: false,
                spawned: false,

            },
        ]

    },
    {
        name: "transition3",
        type: "transition",
        music: "./music/intro.mp3",
        started: false,
        completed: false,

    },
    {
        name: "minigame2",
        type: "minigame",
        music: "./music/bonus1.mp3",
        started: false,
        completed: false,

    },
    {
        name: "transition4",
        type: "transition",
        music: "./music/intro.mp3",
        started: false,
        completed: false,

    },
    {
        name: "level3",
        type: "level",
        music: "./music/intro.mp3",
        started: false,
        completed: false,

    },
]


// //
// var characterSfxData = {

//     homer: { hit: 1, walk: 8, attack: 13 },
//     marge: { hit: 1, walk: 8, attack: 5 },
//     bart: { hit: 1, walk: 8, attack: 13 },
//     lisa: { hit: 1, walk: 4, attack: 8 },
//     bear: { hit: 4, walk: 4, attack: 4 },
//     ball: { hit: 5, walk: 5, attack: 5 },
//     krusty: { hit: 1, walk: 1, attack: 1 },
//     krusty: { hit: 1, walk: 1, attack: 1 },
// }

//animation FRAMES
const characterAnimData = {

    homer: { idle: 1, walk: 8, attack: 13, blow: 3 },
    marge: { idle: 1, walk: 8, attack: 5, blow: 3 },
    bart: { idle: 1, walk: 6, attack: 4, blow: 3 },
    lisa: { idle: 1, walk: 8, attack: 4, blow: 3 },
    bear: { idle: 4, walk: 4, attack: 4 },
    ball: { idle: 5, walk: 5, attack: 5 },
    krusty: { idle: 1, walk: 1, attack: 1 },
    dizzy: { idle: 5, walk: 5, attack: 3 },
}

const characterAnimSizeWData = {

    homer: { idle: .75, walk: 0.95, attack: 1.1, blow: .5 },
    marge: { idle: .8, walk: .8, attack: 1.35, blow: .5 },
    bart: { idle: .7, walk: .94, attack: 1.1, blow: .5 },
    lisa: { idle: .7, walk: .75, attack: 1, blow: .38 },
    bear: { idle: 1, walk: 1, attack: 1 },
    ball: { idle: 1, walk: 1, attack: 1 },
    krusty: { idle: 1, walk: 1, attack: 1 },
    dizzy: { idle: 1, walk: 1, attack: 1 },
}

const characterAnimSizeHData = {

    homer: { idle: 1, walk: 1, attack: 1.1, blow: .85 },
    marge: { idle: 1.1, walk: 1.1, attack: 1.15, blow: 1 },
    bart: { idle: 1, walk: 1, attack: 1.1, blow: .6 },
    lisa: { idle: .85, walk: .8, attack: .8, blow: .6 },
    bear: { idle: 1, walk: 1, attack: 1 },
    ball: { idle: 1, walk: 1, attack: 1 },
    krusty: { idle: 1, walk: 1, attack: 1 },
    dizzy: { idle: 1, walk: 1, attack: 1 },
}

//-5 +5 mas o menos, se suma a la velocidad actual
const characterAnimSpeedData = {

    homer: { idle: 0, walk: 0, attack: 3, blow: 0 },
    marge: { idle: 0, walk: 0, attack: 2, blow: 0 },
    bart: { idle: 0, walk: 0, attack: 2, blow: 0 },
    lisa: { idle: 0, walk: 0, attack: 2, blow: 0 },
    bear: { idle: 2, walk: 2, attack: 2 },
    ball: { idle: 2, walk: 2, attack: 2 },
    krusty: { idle: 0, walk: 0, attack: 0 },
    dizzy: { idle: 0, walk: 0, attack: 0 },
}



var minigame1 = {
    nombre: "balloon",
    heads: [
        {
            class: "Head",
            location: { x: 135, y: 160, z: 000 },
        },
        {
            class: "Head",
            location: { x: 380, y: 160, z: 000 },
        },
        {
            class: "Head",
            location: { x: 645, y: 160, z: 000 },
        },
        {
            class: "Head",
            location: { x: 900, y: 160, z: 000 },
        }
    ],
    enemies: [
        {
            class: "Enemy1",
            location: { x: 190, y: 0, z: 0 },
        },
        {
            class: "Enemy1",
            location: { x: 470, y: 0, z: 0 },
        },
        {
            class: "Enemy1",
            location: { x: 745, y: 0, z: 0 },
        },
        {
            class: "Enemy1",
            location: { x: 1000, y: 0, z: 0 },
        }
    ],
    completed: false,
    spawned: false,
}

const characterSelData = {
    bgImage: "./images/characterSel/bg.png",
    handImage1: "./images/characterSel/handB.png",
    handImage2: "./images/characterSel/handB2.png",
    characters: [
        {
            character: "marge",
            source1: "./images/characterSel/marge1.png",
            source2: "./images/characterSel/marge2.png"
        },
        {
            character: "homer",
            source1: "./images/characterSel/homer1.png",
            source2: "./images/characterSel/homer2.png"
        },
        {
            character: "bart",
            source1: "./images/characterSel/bart1.png",
            source2: "./images/characterSel/bart2.png",
        },
        {
            character: "lisa",
            source1: "./images/characterSel/lisa1.png",
            source2: "./images/characterSel/lisa2.png",
        },
    ],
}

const transitionsData = {
    tvImage: "./images/transitions/tv.png",
    handImage: "./images/transitions/hand.png",
    bunnyImage: "./images/characters/bunny/walk.png",
}

const powerUps = {
    cat: "./images/powerUps/idle.png",
    hammer: "./images/powerUps/hammer.png",
    bottle: "./images/powerUps/bottle.png",
    plant: "./images/powerUps/plant.png",

}

const playableCharacters = [
    "homer", "marge", "bart", "lisa"
]
