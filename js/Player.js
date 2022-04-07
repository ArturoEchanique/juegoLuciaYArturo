class Player extends Character {

    constructor(app, posX, posY, posZ, width, height, keys, playerIndex) {
        super(app, posX, posY, posZ, width, height)
        this.keys = keys
        this.characterLive = 200
        this.hudImage = undefined
        // this.playerLives = 2
        this.playerIndex = playerIndex
        this.playerCharacter = "Homer"
        this.dirKeysPressed = { top: false, right: false, down: false, left: false }
        this.rectangleColor = "yellow"

        //temporal


        this.init()
    }

    init() {
        this.image = { instance: undefined, frameIndex: 0, totalFrames: 8, source: "./images/characters/homer/walk4.png" }

        this.image.instance = new Image()
        this.image.instance.src = this.image.source

        this.hudImage = { instance: undefined, source: "./images/misc/hud.png" }
        this.hudImage.instance = new Image()
        this.hudImage.instance.src = this.hudImage.source
    }

    setMoveVelocity() {

        //X AXISSS
        if (this.app.level.type == "minigame") {


            this.actorVel.x = 0
            this.actorVel.z = 0
            this.actorVel.y = 0
        }
        else {
            if (this.dirKeysPressed.right && !this.dirKeysPressed.left) this.actorVel.x = 1 * this.characterSpeed
            else if ((this.dirKeysPressed.left && !this.dirKeysPressed.right)) this.actorVel.x = -1 * this.characterSpeed
            else this.actorVel.x = 0

            //Z AXIS
            if (this.dirKeysPressed.top && !this.dirKeysPressed.down) this.actorVel.z = 1 * this.characterSpeed
            else if ((this.dirKeysPressed.down && !this.dirKeysPressed.top)) this.actorVel.z = -1 * this.characterSpeed
            else this.actorVel.z = 0
        }
    }



    // blowBalloon() {
    //     this.actorHead.blow()
    // }



    setEventHandlers() {
        console.log("setting events")
        document.addEventListener('keydown', event => {
            const { key } = event
            switch (key) {
                case this.keys.right:

                    if (this.app.level.type == "character") this.app.changeCharacter(1, this.playerIndex)
                    // this.characterSelEntry.changeCharacter(1)
                    this.dirKeysPressed.right = true
                    break
                case this.keys.left:
                    if (this.app.level.type == "character") this.app.changeCharacter(-1, this.playerIndex)
                    // this.characterSelEntry.changeCharacter(-1)
                    this.dirKeysPressed.left = true
                    break
                case this.keys.top:
                    if (this.app.level.name == "minigame2") this.slapHead()
                    else if (this.app.level.name == "minigame1") this.blowBalloon()
                    this.dirKeysPressed.top = true
                    break
                case this.keys.down:
                    if (this.app.level.name == "minigame2") this.slapHead()
                    else if (this.app.level.name == "minigame1") this.blowBalloon()
                    this.dirKeysPressed.down = true
                    break
                case this.keys.jump:
                    if (this.app.level.type != "minigame") this.jump()
                    break
                case this.keys.attack:
                    if (this.app.level.type != "minigame") this.attack()
                    if (this.app.level.type == "character") this.app.selectCharacter(this.playerIndex)
                    break
                case "Enter":
                    if (this.app.level.type == "") this.app.launchNextLevel()
                    //retun to character sel
                    else if (this.app.gameOver.enabled) {
                        this.app.returnToCharacterSel()
                    }
                    else if (this.app.level.type == "character" && this.app.players.length < 2) this.app.addPlayer2()
                    else if (this.app.level.type == "intro") this.app.launchNextLevel()
                    console.log("ENTER PRESSED")
                    break
            }
        })

        document.addEventListener('keyup', event => {
            const { key } = event
            switch (key) {
                case this.keys.right:
                    this.dirKeysPressed.right = false
                    break
                case this.keys.left:
                    this.dirKeysPressed.left = false
                    break
                case this.keys.top:
                    this.dirKeysPressed.top = false
                    break
                case this.keys.down:
                    this.dirKeysPressed.down = false
                    break
            }
        })
    }

    drawLife() {
        this.app.ctx.drawImage(this.hudImage.instance, 0, 0, this.app.gameSize.w / 4 * (this.playerIndex + 1), 100)

        //life
        this.app.ctx.fillStyle = "white"
        this.app.ctx.font = '60px serif'
        this.app.ctx.fillText("P" + (this.playerIndex + 1), (235 * (this.playerIndex + 1)) - 210, 68
        )
        this.app.ctx.font = '40px serif'
        this.app.ctx.fillText(this.characterLive, 235 * (this.playerIndex + 1), 70)

        //lives
        // this.app.ctx.font = '50px serif'
        // this.app.ctx.fillText("lives" + this.playerLives, 400 * (this.playerIndex + 1), 150, 100)
    }

    tick() {
        this.drawLife()
    }

    setSlapHand() {
        this.image.instance.src = "./images/characterSel/bart1.png"

    }
}