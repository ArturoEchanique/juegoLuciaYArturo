class CharacterSelection {
    constructor(app) {
        this.app = app
        this.characterIndex = 0
        this.handPositions = [125, 405, 683, 965]
        this.hand1Position = 0
        this.hand2Position = 1
        this.delay = { started: false, frame: 0, seconds: 0, callback: undefined }
        this.playersDone = { one: false, two: false }
        this.bgImage = { instance: undefined, source: "./images/enemies/player.png" }
        this.pImages = [{ instance: undefined, source: "./images/enemies/player.png" },
        { instance: undefined, source: "./images/enemies/player.png" },
        { instance: undefined, source: "./images/enemies/player.png" },
        { instance: undefined, source: "./images/enemies/player.png" },

        ]

        this.handImage1 = { instance: undefined, source: "./images/enemies/player.png" }
        this.handImage2 = { instance: undefined, source: "./images/enemies/player.png" }

        this.init()
    }

    init() {
        this.hand2Position = -1
        this.bgImage.instance = new Image()
        this.bgImage.instance.src = characterSelData.bgImage

        this.pImages[0].instance = new Image()
        this.pImages[0].instance.src = characterSelData.characters[0].source1
        this.pImages[1].instance = new Image()
        this.pImages[1].instance.src = characterSelData.characters[1].source1
        this.pImages[2].instance = new Image()
        this.pImages[2].instance.src = characterSelData.characters[2].source1
        this.pImages[3].instance = new Image()
        this.pImages[3].instance.src = characterSelData.characters[3].source1

        this.handImage1.instance = new Image()
        this.handImage1.instance.src = characterSelData.handImage1
        this.handImage2.instance = new Image()
        this.handImage2.instance.src = characterSelData.handImage2
    }

    draw() {
        // console.log(this.hand1Position)
        // console.log(this.hand2Position)

        this.tick()
        // this.execDelay()
        this.app.ctx.drawImage(this.bgImage.instance, 0, 0, this.app.gameSize.w, this.app.gameSize.h)

        if (this.hand1Position == 0 || this.hand2Position == 0) {
            this.app.ctx.drawImage(this.pImages[0].instance, 47, 174, this.app.gameSize.w / 4.4, this.app.gameSize.h / 1.5)
        }
        if (this.hand1Position == 1 || this.hand2Position == 1) {
            this.app.ctx.drawImage(this.pImages[1].instance, 327, 174, this.app.gameSize.w / 4.4, this.app.gameSize.h / 1.5)
        }
        if (this.hand1Position == 2 || this.hand2Position == 2) {
            this.app.ctx.drawImage(this.pImages[2].instance, 607, 174, this.app.gameSize.w / 4.4, this.app.gameSize.h / 1.5)
        }
        if (this.hand1Position == 3 || this.hand2Position == 3) {
            this.app.ctx.drawImage(this.pImages[3].instance, 888, 174, this.app.gameSize.w / 4.4, this.app.gameSize.h / 1.5)
        }

        this.app.ctx.drawImage(this.handImage1.instance, this.handPositions[this.hand1Position], 740, this.app.gameSize.w / 11, this.app.gameSize.h / 8)
        this.app.ctx.drawImage(this.handImage2.instance, this.handPositions[this.hand2Position], 740, this.app.gameSize.w / 11, this.app.gameSize.h / 8)
    }

    tick() {


    }

    moveHand(direction, playerIndex) {
        if (playerIndex == 0 && this.playersDone.one == false) {
            if ((this.hand1Position + direction + 4) % 4 == this.hand2Position) {
                direction *= 2
                console.log("SHIIIIIIIT")
            }
            this.hand1Position = (this.hand1Position + direction + 4) % 4
        }
        else if (playerIndex == 1 && this.playersDone.two == false) {
            if ((this.hand2Position + direction + 4) % 4 == this.hand1Position) direction *= 2
            this.hand2Position = (this.hand2Position + direction + 4) % 4


        }
        console.log(this.hand2Position)
    }


    // execDelay() {
    //     // if (this.app.frames >= this.delay.frame + this.delay.seconds * this.app.fps) {
    //     //     this.delay.callback()
    //     //     this.delay.started = false
    //     //     console.log("delayed completed")

    //     // }
    // }
    // startDelay(seconds, callback) {
    //     this.delay.started = true
    //     this.delay.frame = this.app.frames
    //     callback()

    // }



    selectCharacter(playerIndex) {
        if (playerIndex == 0) {
            this.pImages[this.hand1Position].instance.src = characterSelData.characters[this.hand1Position].source2
            this.playersDone.one = true
        }
        else {
            this.pImages[this.hand2Position].instance.src = characterSelData.characters[this.hand2Position].source2
            this.playersDone.two = true
        }
        if (this.app.players.length == 1 && this.playersDone.one) {
            this.app.launchNextLevel()
        }

        if (this.playersDone.one && this.playersDone.two) {
            this.app.launchNextLevel()
        }
    }


}