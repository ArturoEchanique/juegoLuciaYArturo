class Player extends Character {

    constructor(app, posX, posY, posZ, width, height, keys) {
        super(app, posX, posY, posZ, width, height)
        this.keys = keys
        this.characterLive = 200
        this.dirKeysPressed = { top: false, right: false, down: false, left: false }
        this.rectangleColor = "yellow"

        //temporal


        // this.init()
    }

    // init() {

    // }

    setMoveVelocity() {

        //X AXIS
        if (this.dirKeysPressed.right && !this.dirKeysPressed.left) this.actorVel.x = 1 * this.characterSpeed
        else if ((this.dirKeysPressed.left && !this.dirKeysPressed.right)) this.actorVel.x = -1 * this.characterSpeed
        else this.actorVel.x = 0

        //Z AXIS
        if (this.dirKeysPressed.top && !this.dirKeysPressed.down) this.actorVel.z = 1 * this.characterSpeed
        else if ((this.dirKeysPressed.down && !this.dirKeysPressed.top)) this.actorVel.z = -1 * this.characterSpeed
        else this.actorVel.z = 0
    }

    blowBalloon() {
        console.log("hinchando globo")
    }



    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            switch (key) {
                case this.keys.right:
                    if (this.app.level.indexOf("minigame") != -1) this.blowBalloon()
                    this.dirKeysPressed.right = true
                    break
                case this.keys.left:
                    this.dirKeysPressed.left = true
                    break
                case this.keys.top:
                    this.dirKeysPressed.top = true
                    break
                case this.keys.down:
                    if (this.app.level.indexOf("minigame") != -1) this.blowBalloon()
                    this.dirKeysPressed.down = true
                    break
                case this.keys.jump:
                    if (this.app.level.indexOf("minigame") == -1) this.jump()
                    break
                case this.keys.attack:
                    if (this.app.level.indexOf("minigame") == -1) this.attack()
                    break
            }
        })

        document.addEventListener('keyup', event => {
            const { key } = event
            switch (key) {
                case this.keys.right:
                    this.dirKeysPressed.right = false
                    break
                case this.keys.left:
                    this.dirKeysPressed.left = false
                    break
                case this.keys.top:
                    this.dirKeysPressed.top = false
                    break
                case this.keys.down:
                    this.dirKeysPressed.down = false
                    break
            }
        })
    }
}