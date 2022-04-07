class Character extends Actor {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)

        this.characterSpeed = 7
        this.characterJumpForce = 12
        this.rectangleColor = "blue"
        this.characterLive = 100
        this.characterDmg = 50
        this.isAlive = true
        this.actorHead = undefined

        this.frameIndex = 0

        //temporal
        this.weaponLevel = 0
        // this.init()
    }

    // init() {
    //     this.image.instance = new Image()
    //     this.imageInstance.src = "./images/enemies/player.png"
    // }

    // draw() {
    //     // this.ctx.drawImage(this.imageInstance, this.ballPos.x, this.ballPos.y, this.ballSize.w, this.ballSize.h)

    //     // adjusts the speed according to the arrow keys being pressed
    //     // this.setMoveVelocity()
    //     this.move()
    //     this.app.ctx.fillStyle = this.rectangleColor
    //     this.app.ctx.fillRect(this.getDrawPosX(), this.getDrawPosY(), this.actorSize.w, this.actorSize.h)
    // }

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

        if (this.weaponLevel === 0) {
            let radius = 40
            this.app.tryHit(this, this.characterDmg, radius)
        }
        else {
            for (let i = 0; i < this.weaponLevel; i++) {
                this.app.shotBullet(this.actorPos.x, this.actorPos.y + i * 20, this.actorPos.z, 15, 15)
            }
        }

    }

    receiveDmg(dmg) {

        this.characterLive -= dmg

        //solo para comprobar como recibe daño
        this.actorSize.h += 10
        this.actorSize.w += 10
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

}