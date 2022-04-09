class Bullet extends Actor {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)
        this.bulletRadius = this.actorSize.w;
        this.catAudio = undefined
        this.dmg = 50
        this.init()

    }

    init() {
        this.actorSize = { w: 200, h: 200 }
        this.image = { instance: undefined, frameIndex: 0, totalFrames: 9, source: "./images/characters/cat/idle.png", animTime: 10 }
        this.image.instance = new Image()
        this.image.instance.src = this.image.source
        this.actorPhysics.gravity = 0;
        this.actorVel = { x: 13, y: 0, z: 0 }

        this.catAudio = new Audio
        this.catAudio.volume = 1
        let randomInt
        if (Math.random() > 0.5) randomInt = 1
        else randomInt = 2
        this.catAudio.src = "./SFX/" + "cat/" + randomInt + ".wav"
        this.catAudio.play()
    }

    draw() {
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
        this.animate(this.app.frames)
        this.move()
        this.tick()
    }

    move() {
        this.actorPos.x += this.actorVel.x
        this.actorPos.y += this.actorVel.y
        this.actorVel.y += this.actorPhysics.gravity
    }
}