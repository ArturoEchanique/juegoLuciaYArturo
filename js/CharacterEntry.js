class CharacterEntry extends Actor {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)
        // this.image = { instance: undefined, frameIndex: 1, totalFrames: 3, source: "./images/enemies/wario.png" }
        this.characterIndex = 0
        // this.image = { instance: undefined, frameIndex: 1, totalFrames: 3, source: characterSelData[this.characterIndex].source }

    }

    init() {
        this.image.instance = new Image()
        this.image.instance.src = characterSelData[0].source
    }

    changeCharacter(direction) {
        this.characterIndex = (this.characterIndex + direction + characterSelData.length) % characterSelData.length
        this.image.instance.src = characterSelData[this.characterIndex].source
        console.log("changing entry")
    }

}