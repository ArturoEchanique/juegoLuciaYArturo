class Actor {

    constructor(app, posX, posY, posZ, width, height) {
        this.app = app
        this.actorSize = { w: width, h: height }

        // simulated position in 3D Space
        this.rectangleColor = "black"
        this.actorPos = { x: posX, y: posY, z: posZ }
        this.actorIsFalling = false
        this.image = { instance: undefined, frameIndex: 1, totalFrames: 3, source: "./images/enemies/player.png" }
        this.actorVel = { x: 0, y: 0, z: 0 }
        this.actorPhysics = { gravity: .5 }
        this.init()

    }

    init() {
        this.image.instance = new Image()
        this.image.instance.src = this.image.source
    }

    //draw position in 2D space
    getDrawPosX() {
        return this.actorPos.x - this.app.bgPosition.x

    }

    getDrawPosY() {
        return this.app.gameSize.h - this.actorSize.h - (this.actorPos.y + this.actorPos.z) - this.app.bgPosition.y
    }

    draw() {
        // this.app.ctx.drawImage(this.image.instance, 40, 40, 50, 50)

        // adjusts the speed according to the arrow keys being pressed
        // this.setMoveVelocity()
        this.tick()
        this.app.ctx.drawImage(
            this.image.instance,
            this.image.frameIndex * (this.image.instance.width / this.image.totalFrames),
            0,
            this.image.instance.width / this.image.totalFrames,
            this.image.instance.height,
            this.getDrawPosX(),
            this.getDrawPosY(),
            this.actorSize.w,
            this.actorSize.h)
        this.animate(this.app.frames)
        this.move()
        // this.app.ctx.fillStyle = this.rectangleColor
        // this.app.ctx.fillRect(this.getDrawPosX(), this.getDrawPosY(), this.actorSize.w, this.actorSize.h)
    }

    setMoveVelocity() {

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
        else if (this.actorPos.z > 300 && this.actorVel.z > 0) {
            this.actorPos.z += 0
        }
        else this.actorPos.z += this.actorVel.z
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

    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.image.frameIndex++;
        }
        if (this.image.frameIndex >= this.image.totalFrames) {
            this.image.frameIndex = 0;
        }
    }

    tick() {

    }
}