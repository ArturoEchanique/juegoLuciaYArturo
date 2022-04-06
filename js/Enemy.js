class Enemy extends Character {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)

        this.rectangleColor = "red"
        this.characterLive = 100
        this.characterDmg = 60
        this.chasedPlayer = null
        this.state = "idle"
    }

    init() {
        this.image.instance = new Image()
        this.image.instance.src = "./images/enemies/player.png"
    }

    chase() {
        this.state = "chase"
        this.chasedPlayer = this.app.findNearestPlayer(this)
        console.log("chasing")
    }


    setAttackBehaviour() {
        switch (this.state) {
            case "idle":
                break
            case "chase":
                if (this.app.frames % 100 == 0 && this.app.actorsDistance(this, this.chasedPlayer) < 100) {
                    this.attack()
                }
                // this.actorVel = chasedPlayer.actorPos - this.actorPos
                break
        }
    }

    setMoveVelocity() {
        switch (this.state) {


            case "idle":
                break
            case "chase":
                //harcoded
                // this.chasedPlayer = this.app.players[0]
                //hardcoded
                const a = this.chasedPlayer.actorPos.x - this.actorPos.x
                const c = this.chasedPlayer.actorPos.z - this.actorPos.z
                const module = Math.sqrt(a * a + c * c)
                //aun nose porque el chase parece ir mas rapido en el z que en el x, pero lo compenso aqui
                this.actorVel.x = a * 1 * this.characterSpeed / module
                this.actorVel.z = c * .8 * this.characterSpeed / module
                console.log(this.actorVel)
                // this.actorVel = chasedPlayer.actorPos - this.actorPos
                break
        }
    }

    playBallonMinigame() {
        if (this.app.frames % (Math.floor(Math.random() * 60)) == 0) {
            this.blowBalloon()
        }
    }

    tick() {
        if (this.app.level.name.indexOf("minigame") != -1) {
            this.playBallonMinigame()
        }

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
        super(app, posX, posY, posZ, width, height)

        this.rectangleColor = "purple"
        this.characterSpeed = Math.random() * 1.5 + 2

        this.characterLive = 50
    }

}


class Enemy2 extends Enemy {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)

        this.rectangleColor = "pink"
        this.characterSpeed = .3

        this.characterLive = 75

    }

}

class Enemy3 extends Enemy {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)
        this.enemySize = { w: width, h: height }

        this.rectangleColor = "black"
        this.characterSpeed = .2

        this.characterLive = 200

    }
}