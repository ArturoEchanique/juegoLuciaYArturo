class Character extends Actor {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)

        this.characterSpeed = 7
        this.characterJumpForce = 15
        this.rectangleColor = "blue"
        this.characterLive = 100
        this.actorSize = { w: 300, h: 300 }
        this.characterDmg = 50
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
        // this.hitAudio.pause()
    }

    draw() {


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
        this.tryDrawDamage()
        this.animate(this.app.frames)
        this.move()
        this.tick()
    }

    updateAnimImageSrc() {
        this.image.instance.src = "./images/characters/" + this.playerCharacter + "/" + this.state + ".png"
        this.animationFrames = characterAnimData[this.playerCharacter]
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
        this.delay.end = this.app.frames + this.app.fps * 0.1
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
        this.isAlive = false
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
        this.actorHead.blow()
    }

    handSlapAnim() {
    }

    slapHead() {
        this.actorHead.shake()
        this.handSlapAnim()

    }

    animate(framesCounter) {

        if (framesCounter % (this.image.animFrameTime - characterAnimSpeedData[this.playerCharacter][this.state]) == 0) {

            this.image.frameIndex++;
        }
        if (this.image.frameIndex >= this.image.totalFrames && this.state == "attack") this.isAttacking = false
        else if (this.image.frameIndex >= this.image.totalFrames) {
            this.image.frameIndex = 0;
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
        }
        this.updateAnimImageSrc()
    }

    updateAnimState() {
        if (!this.isAttacking) {
            const a = this.actorVel.x
            const b = this.actorVel.y
            const c = this.actorVel.z
            if (Math.abs(a * a + b * b + c * c) > 0) {
                this.changeState("walk")
            }
            else this.changeState("idle")
        }

    }

}