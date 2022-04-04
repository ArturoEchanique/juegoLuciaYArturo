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
    }


    setMoveVelocity() {
        switch (this.state) {


            case "idle":
                break
            case "chase":
                let chasedPlayer = this.app.findNearestPlayer(this)
                this.actorVel.x = (chasedPlayer.actorPos.x - this.actorPos.x) * 0.02 * this.characterSpeed
                this.actorVel.y = (chasedPlayer.actorPos.y - this.actorPos.y) * 0.02 * this.characterSpeed
                this.actorVel.z = (chasedPlayer.actorPos.z - this.actorPos.z) * 0.02 * this.characterSpeed
                // this.actorVel = chasedPlayer.actorPos - this.actorPos
                if (this.app.frames % 100) {
                    this.attack()
                    break
                }

        }
    }


}