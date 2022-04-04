const BeatemApp = {
    name: 'BeatemApp',
    description: 'Canvas app for beatem up game',
    version: '1.0.0',
    author: 'Lucía y Arturo',
    license: undefined,
    canvasNode: undefined,
    ctx: undefined,
    fps: 60,
    screenSizeMultipler: 4,
    //% of screen that players have already completed
    screenProgress: 0,
    screenCompleted: 0,
    screenEnd: 2688,
    level: "0",
    backgroundSpeed: { x: 0, y: 0 },
    gameSize: { w: undefined, h: undefined },
    frames: 0,
    player1Keys: { jump: " ", top: "ArrowUp", right: "ArrowRight", down: "ArrowDown", left: "ArrowLeft", attack: "b" },

    background: undefined,
    players: [],
    bullets: [],
    enemies: [],
    powerUps: [],

    init(canvasID) {
        this.canvasNode = document.querySelector(`#${canvasID}`)
        this.ctx = this.canvasNode.getContext('2d')
        this.setDimensions()
        this.createAll()
        this.players[0].setEventHandlers()
        // this.setEventHandlers()
        // this.setEventHandlers2()
        this.start()
    },

    setDimensions() {
        this.gameSize = {
            w: 302 * this.screenSizeMultipler,
            h: 224 * this.screenSizeMultipler,
        }
        this.canvasNode.setAttribute('width', this.gameSize.w)
        this.canvasNode.setAttribute('height', this.gameSize.h)
    },


    // TICK -----------------------------------------
    start() {

        setInterval(() => {
            // console.log("screen completed:", this.screenCompleted)
            // console.log("screen progress: ", this.screenProgress)
            // console.log(this.enemies.length)
            this.clearAll()
            this.collectGarbage()
            this.drawAll()
            this.manageFrames()
            this.checkBulletsCollisions()
            this.checkPowerUpCollisions()
            if (this.frames % 500 == 0) this.trySpawnEnemies()

            // if (this.frames % 300 == 20) this.createEnemy()
        }, 1000 / this.fps)
    },

    //TICK -------------------------------------------

    createAll() {
        this.createPlayer()
        this.createBackground()
        this.createPowerUp(900)
        this.createPowerUp(1000)

    },

    trySpawnEnemies() {
        if (this.screenCompleted < this.screenProgress && this.enemies.length == 0) {
            this.createEnemies()
        }
    },

    createPlayer() {
        this.players.push(new Player(this, 100, 0, 0, 50, 50, this.player1Keys))
    },

    createEnemies() {
        let newEnemy = new Enemy1(this, this.screenProgress + 500, 0, 0, 50, 50)
        this.enemies.push(newEnemy)
        newEnemy.chase()

        newEnemy = new Enemy2(this, this.screenProgress + 500, 0, 0, 50, 50)
        this.enemies.push(newEnemy)
        newEnemy.chase()

        newEnemy = new Enemy3(this, this.screenProgress + 500, 0, 0, 50, 50)
        this.enemies.push(newEnemy)
        newEnemy.chase()


    },

    createPowerUp(posX) {
        this.powerUps.push(new PowerUp(this, posX, 0, 0, 50, 50))
    },

    manageFrames() {
        this.frames++
        if (this.frames >= 5000) {
            this.frames = 0
        }
    },

    createBackground() {
        this.background = new Background(this, this.gameSize.w, this.gameSize.h, "./images/bgSimpsons.png")
    },

    drawAll() {
        this.updateBackgroundSpeed()
        this.background.draw()
        this.players.forEach(player => player.draw())
        this.drawBullets()
        this.drawEnemies()
        this.drawPowerUps()
    },

    drawBullets() {

        this.bullets.forEach(bullet => {
            bullet.draw()
        })
    },

    drawEnemies() {

        this.enemies.forEach(enemy => {
            enemy.draw()
        })
    },

    drawPowerUps() {

        this.powerUps.forEach(powerUp => {
            powerUp.draw()
        })
    },

    collectGarbage() {
        this.bullets = this.bullets.filter(bullet => bullet.getDrawPosX() > (0 - bullet.actorSize.w) && bullet.getDrawPosX() <= this.gameSize.w)
        this.enemies = this.enemies.filter(enemy => enemy.isAlive)
        // comprueba si no hay enemigos, y en ese caso, permite avanzar al jugador
    },

    updateScreenCompleted() {
        console.log("checking for update screen")
        if (this.enemies.length == 0) {
            console.log("updating screen completed!!!!!!!!!!!!!")
            this.screenCompleted = this.screenProgress
        }
    },



    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    // clearBalls() {
    //     this.balls = this.balls.filter(eachBall => eachBall.ballPos.x + eachBall.ballSize.w > 0)
    // },

    shotBullet(posX, posY, posZ, width, height) {
        this.bullets.push(new Bullet(this, posX, posY, posZ, width, height))
    },


    //de momento simplemente mata, mas tarde sera mejor que quite vida y que quede claro quien ataca a quien
    //tambien hay que hacer que encuanto encuentre un objetivo que dañe solo a ese y haga break, por lo que
    //el segundo foreach deberia ser un for clasico
    checkBulletsCollisions() {

        this.bullets.forEach(bullet => {
            for (let i = 0; i < this.enemies.length; i++) {
                if (this.checkForCollision(bullet, this.enemies[i], 70)) {
                    this.enemies[i].receiveDmg(bullet.dmg)
                    this.checkAlive(this.enemies[i])
                    this.bullets.splice(this.bullets.indexOf(bullet), 1)
                    break
                }
            }
        })
    },

    //simple melee hit, actor A hits actor B, optionally we can add parameters which decide where the hit occurs.
    tryHit(actorA, dmg, radius) {

        if (actorA instanceof Player) {

            this.enemies.forEach(enemy => {
                if (this.checkForCollision(actorA, enemy, radius)) {
                    enemy.receiveDmg(dmg)
                    checkAlive(enemy)
                }
            })
        }


        if (actorA instanceof Enemy) {

            this.players.forEach(player => {
                if (this.checkForCollision(actorA, player, radius)) {
                    player.receiveDmg(dmg)
                    if (player.characterLive <= 0) {
                        this.killPlayer(player)
                    }
                }
            })
        }

    },

    checkAlive(character) {
        if (character.characterLive <= 0) {
            character.die()
        }
    },

    //tambien hay que hacer que encuanto encuentre un objetivo que beneficie solo a ese y haga break, por lo que
    //el segundo foreach deberia ser un for clasico
    checkPowerUpCollisions() {

        this.powerUps.forEach(powerUp => {
            this.players.forEach(player => {
                if (this.checkForCollision(powerUp, player, 70)) {
                    this.powerUps.splice(this.powerUps.indexOf(powerUp), 1)
                    player.upgradeWeapon()

                }
            })
        })
    },

    //se le podria añadir un parametro opcional que determinara la posicion exacta desde la que el actor A
    //golpea a B, por si tiene un arma de melee. Ademas habria que establecer la convencion de A ataca a B siempre.
    checkForCollision(actorA, actorB, radius) {
        let distance = 0
        distance = this.actorsDistance(actorA, actorB)
        if (distance < radius) return true
        else return false
    },

    actorsDistance(actorA, actorB) {
        let distance = 0
        const a = actorA.actorPos.x - actorB.actorPos.x
        const b = actorA.actorPos.y - actorB.actorPos.y
        const c = actorA.actorPos.z - actorB.actorPos.z
        distance = Math.sqrt(a * a + b * b + c * c)
        return distance
    },

    //convendria que comprobase no solo el player 1 sino un compendio de todos
    updateBackgroundSpeed() {

        if (this.enemies.length > 0) {
            this.backgroundSpeed.x = 0
        }
        else if (this.players[0].getDrawPosX() >= this.gameSize.w * 0.8 && this.screenProgress < this.screenEnd - 5) {
            if (this.players[0].actorVel.x > 0) {
                this.backgroundSpeed.x = this.players[0].actorVel.x
                this.screenProgress += this.backgroundSpeed.x
            }
            else {
                this.backgroundSpeed.x = 0
            }

        }
        else if (this.players[0].getDrawPosX() <= this.gameSize.w * 0.2 && this.screenProgress > 6) {
            if (this.players[0].actorVel.x < 0) {
                this.backgroundSpeed.x = this.players[0].actorVel.x
                this.screenProgress += this.backgroundSpeed.x
            }
            else {
                this.backgroundSpeed.x = 0
            }
        }
        else this.backgroundSpeed.x = 0
    },

    killPlayer(player) {
        this.players.splice(this.players.indexOf(player), 1)
    },

    findNearestPlayer(actor1) {
        let minDistance = 1000000
        let nearestPlayer = null
        this.players.forEach((player) => {
            if (this.actorsDistance(actor1, player) < minDistance) {
                minDistance = this.actorsDistance(actor1, player)
                nearestPlayer = player
            }
        })
        return nearestPlayer
    }

}
