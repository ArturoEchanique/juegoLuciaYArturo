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
    //distancia total del eje Z
    gameZdepth: 300,
    //% of screen that players have already completed
    bgPosition: { x: 0, y: 60 },
    bgBounds: {
        x: 1664 * 4, y: 256 * 4
    },
    level: "character",
    bgSpeed: { x: 0, y: 0 },
    gameSize: { w: undefined, h: undefined },
    frames: 0,
    playerKeys: [{ jump: " ", top: "ArrowUp", right: "ArrowRight", down: "ArrowDown", left: "ArrowLeft", attack: "b" },
    { jump: "e", top: "w", right: "d", down: "s", left: "a", attack: "f" },
    { jump: " ", top: "ArrowUp", right: "ArrowRight", down: "ArrowDown", left: "ArrowLeft", attack: "b" },
    { jump: " ", top: "ArrowUp", right: "ArrowRight", down: "ArrowDown", left: "ArrowLeft", attack: "b" },
    ],
    // player1Keys: { jump: " ", top: "ArrowUp", right: "ArrowRight", down: "ArrowDown", left: "ArrowLeft", attack: "b" },

    background: undefined,
    players: [],
    bullets: [],
    enemies: [],
    heads: [],
    powerUps: [],
    characterSelEntries: [],

    initGame(canvasID) {
        this.canvasNode = document.querySelector(`#${canvasID}`)
        this.ctx = this.canvasNode.getContext('2d')
        this.setDimensions()


        // this.startLevel1()
        // this.startMinigame1()
        this.startCharacterSel()

    },

    initLevel1() {
        this.createLevel1()
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
    startLevel1() {

        this.createLevel1()
        this.players[0].setEventHandlers()
        setInterval(() => {
            this.clearAll()
            this.collectGarbage()
            this.drawLevel1()
            this.manageFrames()
            this.drawFrame()
            this.checkBulletsCollisions()
            this.checkPowerUpCollisions()
            this.readLevelData()

            // if (this.frames % 300 == 20) this.createEnemy()
        }, 1000 / this.fps)
    },

    startMinigame1() {

        this.createMinigame1()
        this.players[0].setEventHandlers()
        setInterval(() => {
            this.clearAll()
            this.collectGarbage()
            this.drawMinigame1()
            this.manageFrames()
            this.drawFrame()

            // if (this.frames % 300 == 20) this.createEnemy()
        }, 1000 / this.fps)
    },

    startCharacterSel() {

        this.createPlayer()
        this.createPlayer()


        this.createCharacterSel()
        this.players[0].setEventHandlers()
        setInterval(() => {
            this.clearAll()
            this.collectGarbage()
            this.drawCharacterSel()
            this.manageFrames()
            this.drawFrame()

            // if (this.frames % 300 == 20) this.createEnemy()
        }, 1000 / this.fps)
    },

    //TICK -------------------------------------------

    createCharacterSel() {

        this.characterSelEntries.push(new CharacterEntry(this, 200, 200, 200, 300, 300))
        this.players[0].characterSelEntry = this.characterSelEntries[0]
        this.characterSelEntries.push(new CharacterEntry(this, 400, 200, 200, 300, 300))
        this.players[1].characterSelEntry = this.characterSelEntries[1]
        this.characterSelEntries.push(new CharacterEntry(this, 600, 200, 200, 300, 300))
        this.characterSelEntries.push(new CharacterEntry(this, 800, 200, 200, 300, 300))



    },

    createLevel1() {

        this.createPlayer()
        this.createBackground()
        this.createPowerUp(900)
        this.createPowerUp(1000)
    },

    createMinigame1() {

        this.createPlayer()
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].actorPos.x = 200 * i + 200
            this.players[i].actorPos.z = 100
            this.players[i].actorHead = this.createHead(minigame1.heads[i])
        }
        for (let i = 0; i < 4; i++) {
            if (this.players[i]) {

            }
            else {
                let newEnemy = this.createEnemy(minigame1.enemies[i])
                newEnemy.actorHead = this.createHead(minigame1.heads[i])


            }
        }
        // for (let i = 0; i < 4; i++) {
        //     this.createHead(minigame1.heads[i])
        // }
        this.createBackground()
    },

    drawCharacterSel() {
        this.ctx.fillStyle = "purple"
        this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h)
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(00, 100, 300, 700)
        this.ctx.fillStyle = "green"
        this.ctx.fillRect(300, 100, 300, 700)
        this.ctx.fillStyle = "yellow"
        this.ctx.fillRect(600, 100, 300, 700)
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(900, 100, 300, 700)
        this.characterSelEntries.forEach(entry => entry.draw())
    },

    drawLevel1() {
        this.updateBgSpeed()
        this.background.draw()
        this.players.forEach(player => player.draw())
        this.drawBullets()
        this.drawEnemies()
        this.drawPowerUps()
    },

    drawLevel2() {

        this.players.forEach(player => player.draw())
        this.createEnemies(level1[i].enemies)
    },

    drawMinigame1() {
        this.players.forEach(player => player.draw())
        this.heads.forEach(head => head.draw())
        this.drawEnemies()
    },

    drawFrame() {
        this.ctx.fillStyle = "red"
        this.ctx.strokeRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    readLevelData() {
        //esta primera condicion quedara antiguada cuando queramos spawnear cosas distintas a enemigos como armas o peatones
        if (this.enemies.length == 0) {
            for (let i = 0; i < level1.length; i++) {
                if (!level1[i].spawned && level1[i].location <= this.bgPosition.x) {
                    level1[i].spawned = true
                    this.createEnemies(level1[i].enemies)
                    this.enemies.forEach(enemie => enemie.chase())
                }
            }
        }


    },

    createPlayer() {
        this.players.push(new Player(this, 200, 0, 15, 100, 100, this.playerKeys[this.players.length]))
    },

    createEnemies(enemies) {

        enemies.forEach(enemy => this.createEnemy(enemy))
        // enemiesStr.forEach(enemyStr => {
        //     this.enemies.push(eval(`new ${enemyStr}(this, this.bgPosition.x + 1200, 0, Math.random() * 500 -300, 50, 50)`))
        // })
    },

    createEnemy(enemy) {

        let enemyCreated = eval(`new ${enemy.class}(this, ${enemy.location.x}, ${enemy.location.y}, ${enemy.location.z}, 100,100)`)
        this.enemies.push(enemyCreated)
        return enemyCreated
    },

    createHead(head) {

        let headRef = eval(`new ${head.class}(this, ${head.location.x}, ${head.location.y}, ${head.location.z}, 100,100)`)
        this.heads.push(headRef)
        return headRef
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
    updateBgSpeed() {

        /// eje X
        if (this.enemies.length > 0) {
            this.bgSpeed.x = 0
        }
        else if (this.players[0].getDrawPosX() >= this.gameSize.w * 0.575 && this.bgPosition.x < this.bgBounds.x - this.bgBounds.y * 1.45) {
            if (this.players[0].actorVel.x > 0) {
                this.bgSpeed.x = this.players[0].actorVel.x
                this.bgPosition.x += this.bgSpeed.x
            }
            else {
                this.bgSpeed.x = 0
            }

        }
        else if (this.players[0].getDrawPosX() <= this.gameSize.w * 0.2 && this.bgPosition.x > 6) {
            if (this.players[0].actorVel.x < 0) {
                this.bgSpeed.x = this.players[0].actorVel.x
                this.bgPosition.x += this.bgSpeed.x
            }
            else {
                this.bgSpeed.x = 0
            }
        }
        else this.bgSpeed.x = 0

        /// eje Z Aqui uso directamente la coordenada Z porque es mas simple


        if (this.players[0].actorPos.z >= 80 && this.bgPosition.y > 4) {
            if (this.players[0].actorVel.z > 0) {
                this.bgSpeed.y = this.players[0].actorVel.z * -1
                this.bgPosition.y += this.bgSpeed.y
            }
            else {
                this.bgSpeed.y = 0
            }

        }
        if (this.players[0].actorPos.z <= 65 && this.bgPosition.y < 128) {
            if (this.players[0].actorVel.z < 0) {
                this.bgSpeed.y = this.players[0].actorVel.z * -1
                this.bgPosition.y += this.bgSpeed.y
            }
            else {
                this.bgSpeed.y = 0
            }
        }
        else this.bgSpeed.y = 0
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
    },

    //////////////// NIVEL 2
}


