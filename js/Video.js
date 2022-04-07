class Video {

    constructor(app) {
        this.app = app
        this.video = undefined
        this.scale = undefined
        this.ready = false
        this.image = { instance: undefined, frameIndex: 0, totalFrames: 3, source: "./images/enemies/player.png", animTime: 10 }
        this.init()

    }

    init() {
        this.video = document.createElement("video")
        this.video.src = "./videos/intro3.mp4"
        this.video.autoPlay = true;
        this.video.loop = true;
        this.video.oncanplay = this.readyToPlayVideo()

    }
    readyToPlayVideo(event) {
        this.scale = Math.min(this.app.gameSize.w / 300, this.app.gameSize.h / 300);
        this.ready = true;
        console.log("video can play")
        // the video can be played so hand it off to the display function
        requestAnimationFrame(this.draw())

    }

    draw() {
        console.log("i am drawing")
        this.app.ctx.drawImage(this.video, 300, 300, 300 * 2, 300 * 2);
    }
}