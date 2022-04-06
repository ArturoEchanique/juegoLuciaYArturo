var levelsData = [
    {
        name: "intro",
        type: "intro",
        started: false,
        completed: false,

    },
    {
        name: "characterSel",
        type: "character",
        started: false,
        completed: false,
    },
    {
        name: "transition1",
        type: "transition",
        started: false,
        completed: false,

    },
    {
        name: "level1",
        type: "level",
        started: false,
        completed: false,
        content: [
            {
                name: "sector1",
                location: 200,
                enemies: [
                    {
                        class: "Enemy1",
                        location: { x: 200, y: 0, z: 100 },
                    },
                    {
                        class: "Enemy1",
                        location: { x: 200, y: 0, z: 100 },
                    },
                    {
                        class: "Enemy1",
                        location: { x: 200, y: 0, z: 100 },
                    }
                ],
                completed: false,
                spawned: false,

            },

            {
                name: "sector2",
                location: 800,
                enemies: [
                    {
                        class: "Enemy1",
                        location: { x: 800, y: 0, z: 100 },
                    },
                    {
                        class: "Enemy1",
                        location: { x: 800, y: 0, z: 100 },
                    },
                    {
                        class: "Enemy1",
                        location: { x: 800, y: 0, z: 100 },
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
        started: false,
        completed: false,

    },
    {
        name: "minigame1",
        type: "minigame",
        started: false,
        completed: false,

    },
    {
        name: "transition3",
        type: "transition",
        started: false,
        completed: false,

    },
    {
        name: "level2",
        type: "level",
        started: false,
        completed: false,

    },
    {
        name: "transition3",
        type: "transition",
        started: false,
        completed: false,

    },
    {
        name: "minigame2",
        type: "minigame",
        started: false,
        completed: false,

    },
    {
        name: "transition4",
        type: "transition",
        started: false,
        completed: false,

    },
    {
        name: "level3",
        type: "level",
        started: false,
        completed: false,

    },
]


var level1 = [
    {
        location: 200,
        name: "sector2",
        enemies: [
            {
                class: "Enemy1",
                location: { x: 200, y: 0, z: 100 },
            },
            {
                class: "Enemy1",
                location: { x: 200, y: 0, z: 100 },
            },
            {
                class: "Enemy1",
                location: { x: 200, y: 0, z: 100 },
            }
        ],
        completed: false,
        spawned: false,

    },

    {
        location: 800,
        name: "sector2",
        enemies: [
            {
                class: "Enemy1",
                location: { x: 800, y: 0, z: 100 },
            },
            {
                class: "Enemy1",
                location: { x: 800, y: 0, z: 100 },
            },
            {
                class: "Enemy1",
                location: { x: 800, y: 0, z: 100 },
            }
        ],
        completed: false,
        spawned: false,

    },
]

var minigame1 = {
    nombre: "balloon",
    heads: [
        {
            class: "Head",
            location: { x: 200, y: 0, z: 300 },
        },
        {
            class: "Head",
            location: { x: 400, y: 0, z: 300 },
        },
        {
            class: "Head",
            location: { x: 600, y: 0, z: 300 },
        },
        {
            class: "Head",
            location: { x: 800, y: 0, z: 300 },
        }
    ],
    enemies: [
        {
            class: "Enemy1",
            location: { x: 200, y: 0, z: 100 },
        },
        {
            class: "Enemy1",
            location: { x: 400, y: 0, z: 100 },
        },
        {
            class: "Enemy1",
            location: { x: 600, y: 0, z: 100 },
        },
        {
            class: "Enemy1",
            location: { x: 800, y: 0, z: 100 },
        }
    ],
    completed: false,
    spawned: false,
}

var characterSelData = {
    bgImage: "./images/characterSel/bg.png",
    handImage1: "./images/characterSel/handB.png",
    handImage2: "./images/characterSel/handB2.png",
    characters: [
        {
            character: "Marge",
            source1: "./images/characterSel/marge1.png",
            source2: "./images/characterSel/marge2.png"
        },
        {
            character: "Homer",
            source1: "./images/characterSel/homer1.png",
            source2: "./images/characterSel/homer2.png"
        },
        {
            character: "Bart",
            source1: "./images/characterSel/bart1.png",
            source2: "./images/characterSel/bart2.png",
        },
        {
            character: "Lisa",
            source1: "./images/characterSel/lisa1.png",
            source2: "./images/characterSel/lisa2.png",
        },
    ],
}

var transitionsData = {
    tvImage: "./images/transitions/tv.png",
    handImage: "./images/transitions/hand.png",
    bunnyImage: "./images/transitions/bunny.png",
}
