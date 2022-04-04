class Enemy extends Character {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)

        this.imageInstance = undefined
        this.rectangleColor = "red"
        this.characterLive = 100
        this.characterDmg = 60
        this.chasedPlayer = null
        this.characterSpeed = 5
        this.state = "idle"


        this.init()
    }

    init() {
        // this.imageInstance = new Image()
        // this.imageInstance.src = 'img/ball.png'
    }

    chase() {
        this.state = "chase"
        this.chasedPlayer = this.app.findNearestPlayer(this)
    }


    setAttackBehaviour() {
        switch (this.state) {
            case "idle":
                break
            case "chase":
                if (this.app.frames % 100 == 0 && this.app.actorsDistance(this, this.chasedPlayer) < 100) {
                    this.attack()
                }
                // this.actorVel = chasedPlayer.actorPos - this.actorPos
                break
        }
    }

    setMoveVelocity() {
        switch (this.state) {


            case "idle":
                break
            case "chase":

                this.actorVel.x = (this.chasedPlayer.actorPos.x - this.actorPos.x) * 0.02 * this.characterSpeed
                this.actorVel.y = (this.chasedPlayer.actorPos.y - this.actorPos.y) * 0.02 * this.characterSpeed
                this.actorVel.z = (this.chasedPlayer.actorPos.z - this.actorPos.z) * 0.02 * this.characterSpeed
                // this.actorVel = chasedPlayer.actorPos - this.actorPos
                break
        }
    }

    draw() {
        // this.ctx.drawImage(this.imageInstance, this.ballPos.x, this.ballPos.y, this.ballSize.w, this.ballSize.h)
        // adjusts the speed according to the arrow keys being pressed
        // this.setMoveVelocity()
        this.move()
        this.setAttackBehaviour()
        this.app.ctx.fillStyle = this.rectangleColor
        this.app.ctx.fillRect(this.getDrawPosX(), this.getDrawPosY(), this.actorSize.w, this.actorSize.h)
    }


}