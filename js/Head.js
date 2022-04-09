class Head extends Actor {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)

        this.headLimit = 100
        this.headSize = 0
        this.bluePos = { x: 0, y: 0, z: 0 }
        this.image = { instance: undefined, frameIndex: 0, totalFrames: 1, source: "./images/enemies/player.png", animTime: 10 }
        this.blueImage = { instance: undefined, frameIndex: 0, totalFrames: 1, source: "./images/enemies/player.png", animTime: 10, enabled: false }
        this.resultsImage = { instance: undefined, frameIndex: 0, totalFrames: 1, source: "./images/enemies/player.png", animTime: 10 }

        this.init()
    }


    init() {
        this.image.source = "./images/minigame/homer.png"
        this.image.instance = new Image()
        this.image.instance.src = this.image.source

        this.blueImage.source = "./images/misc/balloonBlue.png"
        this.blueImage.instance = new Image()
        this.blueImage.instance.src = this.blueImage.source

        this.resultsImage.source = "./images/minigame/1.png"
        this.resultsImage.instance = new Image()
        this.resultsImage.instance.src = this.resultsImage.source
    }

    draw() {


        this.app.ctx.drawImage(
            this.blueImage.instance,
            this.bluePos.x,
            this.bluePos.y,
            100,
            200)

        this.app.ctx.drawImage(
            this.image.instance,
            (this.image.frameIndex) * (this.image.instance.width / this.image.totalFrames),
            0,
            this.image.instance.width / this.image.totalFrames,
            this.image.instance.height,
            this.getDrawPosX(),
            this.getDrawPosY(),
            this.actorSize.w,
            this.actorSize.h)
        if (this.resultsImage.enabled) {
            this.app.ctx.drawImage(
                this.resultsImage.instance,
                this.bluePos.x - 170,
                200,
                400,
                100)
        }



        this.animate(this.app.frames)
        this.move()
        this.tick()
    }

    blow() {
        this.headSize += 5
        if (Math.random() < .8) {
            this.actorSize.h += 10
            this.actorPos.y -= 1.15
        }

        else {
            this.actorSize.w += 10
            this.actorPos.x -= 5
        }
    }

    shake() {
    }

    animate(framesCounter) {
    }

    tick() {
        if (this.app.level.type == "minigame" && !this.app.minigameEnded) {
            if (this.headSize >= this.headLimit) {
                console.log("BOOOOOOOOOM")
                this.app.finishBlowMinigame()
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