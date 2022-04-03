class Actor {

    constructor(app, posX, posY, posZ, width, height) {
        this.app = app
        this.actorSize = { w: width, h: height }

        // simulated position in 3D Space
        this.rectangleColor = "black"
        this.actorPos = { x: posX, y: posY, z: posZ }
        this.actorIsFalling = false
        this.actorVel = { x: 0, y: 0, z: 0 }
        this.actorPhysics = { gravity: .5 }


    }

    //draw position in 2D space
    getDrawPosX() {
        return this.actorPos.x - this.app.screenProgress

    }

    getDrawPosY() {
        return this.app.gameSize.h - this.actorSize.h - (this.actorPos.y + this.actorPos.z / 3)
    }

    draw() {
        // this.ctx.drawImage(this.imageInstance, this.ballPos.x, this.ballPos.y, this.ballSize.w, this.ballSize.h)

        // adjusts the speed according to the arrow keys being pressed
        // this.setMoveVelocity()
        this.move()
        this.app.ctx.fillStyle = this.rectangleColor
        this.app.ctx.fillRect(this.getDrawPosX(), this.getDrawPosY(), this.actorSize.w, this.actorSize.h)
    }

    setMoveVelocity() {

    }

    setPosition() {
        this.actorPos.x += this.actorVel.x
        this.actorPos.y += this.actorVel.y
    }

    tryStopFall() {
        if (this.actorPos.y <= 0) {
            this.actorPos.y = 0
            this.actorIsFalling = false
            this.actorVel.y = 0
        }
    }

    updateGravity() {
        if (this.actorIsFalling) {
            this.actorVel.y -= this.actorPhysics.gravity
        }
    }

    move() {

        this.setMoveVelocity()
        this.updateGravity()
        this.setPosition()
        this.tryStopFall()

    }
}