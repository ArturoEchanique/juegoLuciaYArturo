class Transition {
    constructor(app) {
        this.app = app
        this.characterIndex = 0
        this.handPositions = [125, 405, 683, 965]
        this.hand1Position = 0
        this.hand2Position = 1
        this.playersDone = { one: false, two: false }
        this.tvImage = { instance: undefined, source: "./images/enemies/player.png" }
        this.handImage = { instance: undefined, source: "./images/enemies/player.png", frameIndex: 0, totalFrames: 2, }
        this.bunnyImage = { instance: undefined, source: "./images/enemies/player.png", frameIndex: 0, frameIndex2: 0, totalFrames: 12, }
        this.pImages = [{ instance: undefined, source: "./images/enemies/player.png" },
        { instance: undefined, source: "./images/enemies/player.png" },
        { instance: undefined, source: "./images/enemies/player.png" },
        { instance: undefined, source: "./images/enemies/player.png" },

        ]
        // this.pImage1 = { instance: undefined, source: "./images/enemies/player.png" }
        // this.pImage2 = { instance: undefined, source: "./images/enemies/player.png" }
        // this.pImage3 = { instance: undefined, source: "./images/enemies/player.png" }
        // this.pImage4 = { instance: undefined, source: "./images/enemies/player.png" }

        this.handImage1 = { instance: undefined, source: "./images/enemies/player.png" }
        this.handImage2 = { instance: undefined, source: "./images/enemies/player.png" }

        this.init()
    }

    init() {
        this.tvImage.instance = new Image()
        this.tvImage.instance.src = transitionsData.tvImage

        this.handImage.instance = new Image()
        this.handImage.instance.src = transitionsData.handImage

        this.bunnyImage.instance = new Image()
        this.bunnyImage.instance.src = transitionsData.bunnyImage
    }

    draw() {

        this.app.ctx.fillStyle = "black"
        this.app.ctx.fillRect(0, 0, this.app.gameSize.w, this.app.gameSize.h)

        this.app.ctx.drawImage(
            this.bunnyImage.instance,
            this.bunnyImage.frameIndex * (this.bunnyImage.instance.width / this.bunnyImage.totalFrames),
            0,
            this.bunnyImage.instance.width / this.bunnyImage.totalFrames,
            this.bunnyImage.instance.height,
            700 - this.bunnyImage.frameIndex2,
            400,
            400,
            300)


        this.tick()
        this.app.ctx.drawImage(this.tvImage.instance, 0, 0, this.app.gameSize.w, this.app.gameSize.h)

        // this.app.ctx.drawImage(this.handImage.instance, 0, 0, this.app.gameSize.w, this.app.gameSize.h)
        this.app.ctx.drawImage(
            this.handImage.instance,
            this.handImage.frameIndex * (this.handImage.instance.width / this.handImage.totalFrames),
            0,
            this.handImage.instance.width / this.handImage.totalFrames,
            this.handImage.instance.height,
            790,
            686,
            325,
            225)



        // if (this.hand1Position == 0 || this.hand2Position == 0) {
        //     this.app.ctx.drawImage(this.pImages[0].instance, 47, 174, this.app.gameSize.w / 4.4, this.app.gameSize.h / 1.5)
        // }
        // if (this.hand1Position == 1 || this.hand2Position == 1) {
        //     this.app.ctx.drawImage(this.pImages[1].instance, 327, 174, this.app.gameSize.w / 4.4, this.app.gameSize.h / 1.5)
        // }
        // if (this.hand1Position == 2 || this.hand2Position == 2) {
        //     this.app.ctx.drawImage(this.pImages[2].instance, 607, 174, this.app.gameSize.w / 4.4, this.app.gameSize.h / 1.5)
        // }
        // if (this.hand1Position == 3 || this.hand2Position == 3) {
        //     this.app.ctx.drawImage(this.pImages[3].instance, 888, 174, this.app.gameSize.w / 4.4, this.app.gameSize.h / 1.5)
        // }

        // this.app.ctx.drawImage(this.handImage1.instance, this.handPositions[this.hand1Position], 740, this.app.gameSize.w / 11, this.app.gameSize.h / 8)
        // this.app.ctx.drawImage(this.handImage2.instance, this.handPositions[this.hand2Position], 740, this.app.gameSize.w / 11, this.app.gameSize.h / 8)
    }

    tick() {

        this.animateHand(this.app.frames)
        this.animateBunny(this.app.frames)
        this.bunnyImage.frameIndex2 += 2
        if (this.bunnyImage.frameIndex2 >= 50) {
            this.app.launchNextLevel()
        }
    }


    animateHand(framesCounter) {
        if (framesCounter % 8 == 0) {
            this.handImage.frameIndex++
        }
        if (this.handImage.frameIndex >= this.handImage.totalFrames) {
            this.handImage.frameIndex = 0
        }
    }

    animateBunny(framesCounter) {
        if (framesCounter % 3 == 0) {
            this.bunnyImage.frameIndex++

        }
        if (this.bunnyImage.frameIndex >= this.bunnyImage.totalFrames) {
            this.bunnyImage.frameIndex = 0
        }
    }

}