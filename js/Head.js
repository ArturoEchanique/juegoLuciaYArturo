class Head extends Actor {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)

        this.headLimit = 100
        this.headSize = 0


    }


    init() {
        this.image.source = "./images/marioHead.png"
        this.image.instance = new Image()
        this.image.instance.src = this.image.source
    }

    blow() {
        this.headSize += 5
        this.actorSize.w += 5
        this.actorSize.h += 5
    }

    shake() {
        console.log("I am skaking")
    }

    animate(framesCounter) {
    }

    tick() {
        if (this.app.level.name.indexOf("minigame") != -1) {
            if (this.headSize >= this.headLimit) {
                console.log("BOOOOOOOOOM")
                // this.app.finishMinigame()
            }
            else {
                if (this.app.frames % (Math.floor(Math.random() * 2000)) == 0) {
                    this.shake()
                }
            }
        }
    }
}