class Enemy3 extends Enemy {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)
        this.enemySize = { w: width, h: height }


        this.imageInstance = undefined
        this.rectangleColor = "black"
        this.characterSpeed = .2

        this.characterLive = 50


        this.init()
    }

    init() {
        // this.imageInstance = new Image()
        // this.imageInstance.src = 'img/ball.png'
    }


    // setMoveVelocity() {
    // }
}