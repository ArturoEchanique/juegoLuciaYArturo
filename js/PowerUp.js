class PowerUp extends Actor {

    constructor(app, posX, posY, posZ, width, height, item) {
        super(app, posX, posY, posZ, width, height)
        this.powerUpItem = item
        this.rectangleColor = "green"
        this.actorSize = { w: 200, h: 200 }
        this.image = { instance: undefined, frameIndex: 0, totalFrames: 9, source: powerUps[item], animTime: 30 }
        this.init()
    }



    setMoveVelocity() {

        //X AXIS


        //Y AXIS

    }
}