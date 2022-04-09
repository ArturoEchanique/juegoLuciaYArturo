class Character extends Actor {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)

        this.characterSpeed = 7
        this.characterJumpForce = 13
        this.rectangleColor = "blue"
        this.characterLive = 100
        this.actorSize = { w: 300, h: 300 }
        this.characterDmg = 50
        this.isDiying = false
        this.canDraw = true
        this.stopAnimation = false
        this.isBlowing = false
        this.blowTimer = undefined

        this.whoosh = { audio1: undefined, audio2: undefined, index: 0 }

        this.isAttacking = false
        this.hitImage = { instance: undefined, source: "" }
        // this.image = { instance: undefined, frameIndex: 5, totalFrames: 1, source: "", animFrameTime: 6 }
        this.animationFrames = { idle: 1, walk: 8, attack: 5 }
        this.isAlive = true
        this.playerCharacter = "marge"
        this.actorHead = undefined
        this.state = "idle"
        this.hitAudio = undefined

        //temporal
        this.weaponLevel = 0
        this.init()
    }

    init() {
        this.image = { instance: undefined, frameIndex: 0, totalFrames: 1, source: "./images/characters/" + this.playerCharacter + "/" + this.state + ".png", animFrameTime: 6 }
        this.image.instance = new Image()
        this.image.instance.src = this.image.source

        this.hitImage = { instance: undefined, source: "./images/misc/hit.png" }
        this.hitImage.instance = new Image()
        this.hitImage.instance.src = this.hitImage.source

        this.whoosh.audio1 = new Audio
        this.whoosh.audio1.volume = 0.9
        this.whoosh.audio1.src = "./SFX/other/whoosh.mp3"

        this.whoosh.audio2 = new Audio
        this.whoosh.audio2.volume = 0.9
        this.whoosh.audio2.src = "./SFX/other/whoosh.mp3"

        this.hitAudio = new Audio
        this.hitAudio.volume = .4

        let randomInt = 0
        randomInt = Math.floor(Math.random() * 3) + 1
        this.hitAudio.src = "./SFX/" + "other/" + "punch" + randomInt + ".mp3"

    }

    draw() {

        if (this.isDiying) {
            if (this.app.frames % 2 == 0) this.canDraw = !this.canDraw
        }
        if (this.canDraw) {
            this.app.ctx.drawImage(
                this.image.instance,
                (this.image.frameIndex) * (this.image.instance.width / this.image.totalFrames),
                0,
                this.image.instance.width / this.image.totalFrames,
                this.image.instance.height,
                this.getDrawPosX(),
                this.getDrawPosY(),
                this.actorSize.w * characterAnimSizeWData[this.playerCharacter][this.state],
                this.actorSize.h * characterAnimSizeHData[this.playerCharacter][this.state])
        }

        this.tryDrawDamage()
        this.animate(this.app.frames)
        this.move()
        this.tick()
        // this.app.ctx.fillStyle = "red"
        // this.app.ctx.fillRect(this.getDrawPosX(), this.getDrawPosY(), 30, 30)
    }

    updateAnimImageSrc() {
        this.image.instance.src = "./images/characters/" + this.playerCharacter + "/" + this.state + ".png"
        this.animationFrames = characterAnimData[this.playerCharacter]
    }

    getDrawPosY() {
        return this.app.gameSize.h - this.actorSize.h * characterAnimSizeHData[this.playerCharacter][this.state] - this.app.bgPosition.y - this.actorPos.z - this.actorPos.y
    }



    jump() {
        if (this.actorIsFalling == false) {
            this.actorIsFalling = true
            this.actorVel.y += this.characterJumpForce
        }
    }

    // setMoveVelocity() {
    // }


    //temporal
    upgradeWeapon() {
        this.weaponLevel++
    }

    attack() {

        if (this.app.gameOver.enabled == false) {
            this.isAttacking = true
            this.changeState("attack")
            this.image.frameIndex = 0
            if (this.weaponLevel === 0) {
                let radius = 150
                this.app.tryHit(this, this.characterDmg, radius)
                if (this.whoosh.index == 0) {
                    this.whoosh.audio1.play()
                    this.whoosh.index = 1
                }
                else {
                    this.whoosh.audio2.play()
                    this.whoosh.index = 0
                }

            }
            else {
                for (let i = 0; i < this.weaponLevel; i++) {
                    this.app.shotBullet(this.actorPos.x, this.actorPos.y, this.actorPos.z + i * 90, 15, 15)
                }
            }
        }
    }


    receiveDmg(dmg) {


        this.characterLive -= dmg

        //solo para comprobar como recibe daño
        // this.actorSize.h += 10
        // this.actorSize.w += 10
        this.startEstheticDmg()
        this.hitAudio.play()
    }

    startEstheticDmg() {
        this.delay.start = this.app.frames
        this.delay.end = this.app.frames + this.app.fps * 0.125
    }

    tryDrawDamage() {
        if (this.app.frames > this.delay.start && this.app.frames < this.delay.end) {
            this.app.ctx.drawImage(
                this.hitImage.instance,
                this.getDrawPosX() + this.actorSize.w / 2,
                this.getDrawPosY() + this.actorSize.h / 2,
                200,
                200)

        }
        if (this.app.frames > this.delay.end) {
            this.delay = { start: 0, finish: 0 }
        }



    }



    die() {
        this.isDiying = true
        let dieFrame = 0

        setTimeout(() => {
            this.isAlive = false
            console.log("died")
        }, 600);

        if (this.isDiying) {

            if (this.app.frames % 100 == 0) this.canDraw = !this.canDraw

        }

        // de momento aqui
    }

    // animate(framesCounter) {
    //     if (framesCounter % this.image.animTime == 0) {
    //         this.image.frameIndex++;
    //     }
    //     if (this.image.frameIndex >= this.image.totalFrames) {
    //         this.image.frameIndex = 0
    //     }
    // }

    blowBalloon() {
        if (!this.app.minigameEnded) {
            this.actorHead.blow()
            if (this.whoosh.index == 0) {
                this.whoosh.audio1.play()
                this.whoosh.index = 1
            }
            else {
                this.whoosh.audio2.play()
                this.whoosh.index = 0
            }
            this.isBlowing = true
            this.stopAnimation = false
            clearTimeout(this.blowTimer)
            this.blowTimer = setTimeout(() => {
                this.isBlowing = false
            }, 150);
        }

    }

    handSlapAnim() {
    }

    slapHead() {
        this.actorHead.shake()
        this.handSlapAnim()

    }

    animate(framesCounter) {

        if (!this.stopAnimation && framesCounter % (this.image.animFrameTime - characterAnimSpeedData[this.playerCharacter][this.state]) == 0) {

            this.image.frameIndex++;
        }
        if (this.image.frameIndex >= this.image.totalFrames && this.state == "attack") this.isAttacking = false
        else if (this.image.frameIndex >= this.image.totalFrames) {
            this.image.frameIndex = 0;
            if (!this.isBlowing && this.app.level.type == "minigame") this.stopAnimation = true
        }


    }

    changeState(state) {
        this.state = state
        switch (state) {
            case "idle":
                this.image.totalFrames = this.animationFrames.idle
                break
            case "walk":
                this.image.totalFrames = this.animationFrames.walk
                break
            case "attack":
                this.image.totalFrames = this.animationFrames.attack
                break
            case "blow":
                this.image.totalFrames = 3
                break
        }
        this.updateAnimImageSrc()
    }

    updateAnimState() {
        if (!this.isAttacking && this.app.level.type != "minigame") {
            const a = this.actorVel.x + this.app.bgSpeed.x
            const b = this.actorVel.y
            const c = this.actorVel.z
            if (Math.abs(a * a + b * b + c * c) > 0) {
                this.changeState("walk")
            }
            else this.changeState("idle")
        }

    }

}