class Character extends Actor {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)

        this.characterSpeed = 5
        this.characterJumpForce = 12
        this.rectangleColor = "blue"
        this.characterLive = 100
        this.characterDmg = 50

        //temporal
        this.weaponLevel = 0

        this.imageInstance = undefined

        this.init()
    }

    init() {
        // this.imageInstance = new Image()
        // this.imageInstance.src = 'img/ball.png'
    }

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
                this.app.shotBullet(this.actorPos.x, this.actorPos.y + i * 20, 0, 15, 15)
            }
        }

    }

    receiveDmg(dmg) {
        this.characterLive -= dmg

        //solo para comprobar como recibe daño
        this.actorSize.h += 10
        this.actorSize.w += 10
    }
}