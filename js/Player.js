class Player extends Character {

    constructor(app, posX, posY, posZ, width, height, keys, playerIndex) {
        super(app, posX, posY, posZ, width, height)
        this.keys = keys
        this.characterLive = 500
        this.hudImage = undefined
        this.hudMini = undefined
        this.hudPressStart = undefined
        // this.playerLives = 2
        this.playerIndex = playerIndex
        this.dirKeysPressed = { top: false, right: false, down: false, left: false }
        this.rectangleColor = "yellow"


        //temporal


        // this.init()
        this.initHud()
    }

    // init() {
    //     this.image = { instance: undefined, frameIndex: 0, totalFrames: 8, source: "./images/characters/homer/walk.png" }
    //     this.image.instance = new Image()
    //     this.image.instance.src = this.image.source


    // }

    initHud() {
        this.hudImage = { instance: undefined, source: "./images/misc/hud.png" }
        this.hudImage.instance = new Image()
        this.hudImage.instance.src = this.hudImage.source

        this.hudMini = { instance: undefined, source: "" }
        this.hudMini.instance = new Image()
        this.hudMini.instance.src = this.hudMini.source

        this.hudPressStart = { instance: undefined, source: "./images/misc/pressStart.png" }
        this.hudPressStart.instance = new Image()
        this.hudPressStart.instance.src = this.hudPressStart.source
    }

    characterSelected() {
        this.hitAudio = new Audio
        this.hitAudio.volume = 0.6
        this.hitAudio.src = "./SFX/" + this.playerCharacter + "/01.mp3"
        this.updateHudMini()
    }

    updateHudMini() {
        this.hudMini.instance.src = "./Images//hudMini/" + this.playerCharacter + ".png"
    }

    setMoveVelocity() {
        //X AXISSS
        if (!this.app.gameLocked) {
            if (this.app.level.type == "minigame") {


                this.actorVel.x = 0
                this.actorVel.z = 0
                this.actorVel.y = 0
            }

            else {
                if (this.dirKeysPressed.right && !this.dirKeysPressed.left) {
                    this.actorVel.x = 1 * this.characterSpeed
                }

                else if ((this.dirKeysPressed.left && !this.dirKeysPressed.right)) {
                    this.actorVel.x = -1 * this.characterSpeed
                }
                else this.actorVel.x = 0

                //Z AXIS
                if (this.dirKeysPressed.top && !this.dirKeysPressed.down) this.actorVel.z = 1 * this.characterSpeed
                else if ((this.dirKeysPressed.down && !this.dirKeysPressed.top)) this.actorVel.z = -1 * this.characterSpeed
                else this.actorVel.z = 0
            }
        }
        else this.actorVel = { x: 0, y: 0, z: 0 }


    }



    // blowBalloon() {
    //     this.actorHead.blow()
    // }



    setEventHandlers() {
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
                    if (this.app.level.type == "level" && this.isAttacking == false) this.attack()
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


    setPosition() {
        if (this.actorPos.x < 30 && this.actorVel.x < 0) {
            this.actorPos.x += 0
        }
        else if (this.actorPos.x > this.app.bgBounds.x - 350 && this.actorVel.x > 0) {
            this.actorPos.x += 0
        }
        else this.actorPos.x += this.actorVel.x
        this.actorPos.y += this.actorVel.y
        /// ABAJO
        if (this.actorPos.z < -115 && this.actorVel.z < 0) {
            this.actorPos.z += 0

        }
        /// ARRIBA
        else if (this.actorPos.z > 200 && this.actorVel.z > 0) {
            this.actorPos.z += 0
        }
        else this.actorPos.z += this.actorVel.z

        if (this.getDrawPosX() < this.app.gameSize.w * 0) this.actorPos.x += this.characterSpeed
        else if (this.getDrawPosX() > this.app.gameSize.w * 1.04 - this.actorSize.w) this.actorPos.x -= this.characterSpeed
    }

    drawHud() {


        if (this.playerIndex == 0) {
            this.app.ctx.drawImage(this.hudPressStart.instance, (this.app.gameSize.w / 4) * 2, 0, this.app.gameSize.w / 4, 100)
            this.app.ctx.drawImage(this.hudPressStart.instance, (this.app.gameSize.w / 4) * 3, 0, this.app.gameSize.w / 4, 100)
            if (this.app.players.length == 1) {
                this.app.ctx.drawImage(this.hudPressStart.instance, (this.app.gameSize.w / 4) * 1, 0, this.app.gameSize.w / 4, 100)
            }
        }
        this.app.ctx.drawImage(this.hudImage.instance, (this.app.gameSize.w / 4) * (this.playerIndex), 0, this.app.gameSize.w / 4, 100)
        this.app.ctx.drawImage(this.hudMini.instance, (this.app.gameSize.w / 4) * (this.playerIndex), 0, 100, 100)

        this.app.ctx.fillStyle = "white"
        this.app.ctx.font = 'Bold 40px serif'
        this.app.ctx.fillText(this.characterLive, 235 + (this.app.gameSize.w / 4) * (this.playerIndex), 73)


    }

    tick() {
        if (this.app.level.type == "level") this.drawHud()
        this.updateAnimState()
    }

    setSlapHand() {
        this.image.instance.src = "./images/characterSel/bart1.png"

    }
}