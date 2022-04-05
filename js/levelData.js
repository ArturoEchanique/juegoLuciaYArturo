var level1 = [
    {
        location: 200,
        name: "sector2",
        enemies: [
            {
                class: "Enemy1",
                location: 200,
            },
            {
                class: "Enemy1",
                location: 200,
            },
            {
                class: "Enemy1",
                location: 200,
            }
        ],
        completed: false,
        spawned: false,

    },
    {
        location: 1000,
        name: "sector3",
        enemies: ["Enemy1", "Enemy1", "Enemy1", "Enemy1"],
        completed: false,
        spawned: false,

    },
    {
        location: 1500,
        name: "sector4",
        enemies: ["Enemy1", "Enemy1", "Enemy1", "Enemy1"],
        completed: false,
        spawned: false,

    },
    {
        location: 2500,
        name: "sector5",
        enemies: ["Enemy1", "Enemy1", "Enemy1", "Enemy1"],
        completed: false,
        spawned: false,

    },
    {
        location: 3000,
        name: "sector6",
        enemies: ["Enemy1", "Enemy1", "Enemy1", "Enemy1"],
        completed: false,
        spawned: false,

    }
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

var characterSelData = [
    {
        character: "Homer",
        source: "./images/characterSel/mario.png"
    },
    {
        character: "Marge",
        source: "./images/characterSel/wario.png"
    },
    {
        character: "Lisa",
        source: "./images/characterSel/peach.png"
    },
    {
        character: "Bart",
        source: "./images/characterSel/luigi.png"
    },

]
