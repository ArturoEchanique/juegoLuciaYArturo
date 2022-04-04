class Enemy2 extends Enemy {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)

        this.imageInstance = undefined
        this.rectangleColor = "pink"
        this.characterSpeed = .3

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