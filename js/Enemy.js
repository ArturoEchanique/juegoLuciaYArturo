class Enemy extends Character {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)

        this.rectangleColor = "red"
        this.characterLive = 100
        this.characterDmg = 15
        this.chasedPlayer = null
        this.isChasing = false
        this.state = "idle"
        this.playerCharacter = "dizzy"
    }

    // init() {
    //     this.image.instance = new Image()
    //     this.image.instance.src = "./images/enemies/player.png"
    // }

    chase() {
        this.isChasing = true
        if (this.app.players.length > 0) this.chasedPlayer = this.app.findNearestPlayer(this)
    }

    idle() {
        this.isChasing = false
        if (Math.random() > 0.9) this.actorVel = { x: 0, y: 0, z: 0 }

    }

    setHitSound() {
        // this.hitAudio = new Audio
        // this.hitAudio.volume = 1
        // // let randomInt = Math.floor(Math.random() * 2)
        // let randomInt = 0
        // if (Math.random() > 0.5) randomInt = 1
        // else randomInt = 2
        // this.hitAudio.src = "./SFX/" + "other" + "/hit" + 2 + ".wav"
    }


    setAttackBehaviour() {

        switch (this.isChasing) {

            case false:
                break
            case true:
                if (this.app.frames % 60 == 0 && this.app.actorsDistance(this, this.chasedPlayer) < 250 && !this.isDiying) {
                    this.attack()
                }
                // this.actorVel = chasedPlayer.actorPos - this.actorPos
                break
        }
    }

    setMoveVelocity() {
        switch (this.isChasing && !this.isDiying) {


            case this.actorVel = { x: 0, y: 0, z: 0 }:
                break
            case true:
                //harcoded
                // this.chasedPlayer = this.app.players[0]
                //hardcoded
                const a = this.chasedPlayer.actorPos.x + 100 - this.actorPos.x
                const c = this.chasedPlayer.actorPos.z - this.actorPos.z
                const module = Math.sqrt(a * a + c * c)
                //aun nose porque el chase parece ir mas rapido en el z que en el x, pero lo compenso aqui
                this.actorVel.x = a * 1 * this.characterSpeed / module
                this.actorVel.z = c * .8 * this.characterSpeed / module
                // this.actorVel = chasedPlayer.actorPos - this.actorPos
                break
        }
    }

    playBallonMinigame() {
        if (this.app.frames % (Math.floor(Math.random() * 60)) == 0) {
            this.blowBalloon()

        }
    }

    playSlapMinigame() {
        if (this.app.frames % (Math.floor(Math.random() * 60)) == 0) {
            this.slapHead()
        }
    }

    tick() {


        if (this.app.level.name == "minigame1") {
            this.playBallonMinigame()
        }
        else if (this.app.level.name == "minigame2") this.playSlapMinigame()
        else if (this.isChasing == true && this.app.frames % (Math.floor(Math.random() * 10) * 100) == 0) this.idle()
        else if (this.isChasing == false && this.app.frames % (Math.floor(Math.random() * 10) * 50) == 0) this.chase()
        this.setAttackBehaviour()
        this.updateAnimState()

    }

    // draw() {
    //     // this.ctx.drawImage(this.imageInstance, this.ballPos.x, this.ballPos.y, this.ballSize.w, this.ballSize.h)
    //     // adjusts the speed according to the arrow keys being pressed
    //     // this.setMoveVelocity()
    //     this.app.ctx.drawImage(this.instance, 40, 40, 50, 50)
    //     this.move()
    //     this.setAttackBehaviour()
    //     this.app.ctx.fillStyle = this.rectangleColor
    //     this.app.ctx.fillRect(this.getDrawPosX(), this.getDrawPosY(), this.actorSize.w, this.actorSize.h)
    // }


}


class Enemy1 extends Enemy {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ)

        this.actorSize = { w: 325, h: 325 }
        this.playerCharacter = "dizzy"

        this.rectangleColor = "purple"
        this.characterSpeed = Math.random() * 1.5 + 3

        this.characterLive = 60
    }

}


class Enemy2 extends Enemy {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)

        this.playerCharacter = "ball"

        this.rectangleColor = "pink"
        this.characterSpeed = Math.random() * 1.5 + 3

        this.characterLive = 75

    }

}

class Enemy3 extends Enemy {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)
        this.actorSize = { w: 300, h: 300 }
        this.enemySize = { w: width, h: height }
        this.playerCharacter = "bear"
        this.characterDmg = 25
        this.rectangleColor = "black"
        this.characterSpeed = Math.random() * 1.5 + 6

        this.characterLive = 500

    }


    receiveDmg(dmg) {


        this.characterLive -= dmg

        //solo para comprobar como recibe daño
        this.actorSize.h += 25
        this.actorSize.w += 25
        this.startEstheticDmg()
        this.hitAudio.play()
    }
}