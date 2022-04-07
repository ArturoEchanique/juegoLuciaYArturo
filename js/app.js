const BeatemApp = {
    name: 'BeatemApp',
    description: 'Canvas app for beatem up game',
    version: '1.0.0',
    author: 'Lucía y Arturo',
    license: undefined,
    canvasNode: undefined,
    ctx: undefined,
    fps: 60,
    currentInterval: 0,

    gameOver: { instance: undefined, source: "./images/misc/gameOver.png", transparency: 1, enabled: false },

    //pre to avoid flickering
    introImagePre: { instance: undefined, frame: 7, totalFrames: 300 },
    introImage: { instance: undefined, frame: 7, totalFrames: 300 },


    screenSizeMultipler: 4,
    videoContainer: undefined,
    //distancia total del eje Z
    gameZdepth: 300,
    //% of screen that players have already completed
    bgPosition: { x: 0, y: 60 },
    bgBounds: {
        x: 1664 * 4, y: 256 * 4
    },
    level: { name: "", type: "", index: 0 },
    audio: undefined,
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
    characterSelection: undefined,
    players: [],
    bullets: [],
    enemies: [],
    heads: [],
    powerUps: [],
    transition: undefined,

    initGame(canvasID) {
        this.canvasNode = document.querySelector(`#${canvasID}`)
        this.ctx = this.canvasNode.getContext('2d')
        this.setDimensions()
        this.createPlayer()
        this.drawBlackScreen()

        this.audio = new Audio
        this.gameOver.instance = new Image()
        this.gameOver.instance.src = this.gameOver.source
        // this.launchLevel(2)


    },

    drawBlackScreen() {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    addPlayer2() {
        this.createPlayer()
        this.characterSelection.hand2Position = 0
        while (this.characterSelection.hand2Position == this.characterSelection.hand1Position) this.characterSelection.hand2Position++
    },

    setDimensions() {
        this.gameSize = {
            w: 302 * this.screenSizeMultipler,
            h: 224 * this.screenSizeMultipler,
        }
        this.canvasNode.setAttribute('width', this.gameSize.w)
        this.canvasNode.setAttribute('height', this.gameSize.h)
    },

    //entra un parametro opcional, que fuerza a cargar un nivel, si no, carga el próximo nivel
    launchNextLevel() {

        for (let i = 0; i < levelsData.length; i++) {
            if (levelsData[i].started == false) {
                this.launchLevel(i)
                break
            }
        }





    },

    launchLevel(index) {

        clearInterval(this.currentInterval)
        switch (index) {
            case 0: this.startIntro()
                break
            case 1: this.startCharacterSel()
                break
            case 2: this.startTransition()
                break
            case 3: this.startLevel1()
                break
            case 4: console.log("transition2")
                break
            case 5: this.startMinigame1()
                break
            //de momento
            case 9: this.startMinigame2()
                break
        }
        levelsData[index].started = true
        this.level.name = levelsData[index].name
        this.level.type = levelsData[index].type
        this.level.index = index
        if (this.audio) {

            this.audio.pause()
            this.audio.src = levelsData[index].music
            this.audio.play()
        }


    },




    // TICK -----------------------------------------
    startLevel1() {

        // this.level.name = "level1"
        // this.level.type = "level"
        this.createLevel1()

        this.currentInterval = setInterval(() => {
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

        // this.level.name = "minigame1"
        // this.level.type = "minigame"
        this.createMinigame1()

        this.currentInterval = setInterval(() => {
            this.clearAll()
            this.collectGarbage()
            this.drawMinigame1()
            this.manageFrames()
            this.drawFrame()

            // if (this.frames % 300 == 20) this.createEnemy()
        }, 1000 / this.fps)
    },

    startMinigame2() {

        // this.level.name = "minigame1"
        // this.level.type = "minigame"
        this.createMinigame2()

        this.currentInterval = setInterval(() => {
            this.clearAll()
            this.collectGarbage()
            this.drawMinigame2()
            this.manageFrames()
            this.drawFrame()

            // if (this.frames % 300 == 20) this.createEnemy()
        }, 1000 / this.fps)
    },

    startCharacterSel() {

        // this.level.name = "character"
        // this.level.type = "character"
        // this.level.index = 0
        // this.createPlayer()
        // this.createPlayer()


        this.createCharacterSel()
        this.currentInterval = setInterval(() => {
            this.clearAll()
            this.collectGarbage()
            this.drawCharacterSel()
            this.manageFrames()
            this.drawFrame()

            // if (this.frames % 300 == 20) this.createEnemy()
        }, 1000 / this.fps)
    },

    startIntro() {

        this.createIntro()
        this.currentInterval = setInterval(() => {
            this.clearAll()
            this.collectGarbage()
            this.drawIntro()
            this.manageFrames()
            this.drawFrame()

        }, 1000 / this.fps)
    },

    startTransition() {

        // this.level.name = "transition"
        // this.level.type = "transition"

        this.createTransition()
        this.currentInterval = setInterval(() => {
            this.clearAll()
            this.collectGarbage()
            this.drawTransition()
            this.manageFrames()
            this.drawFrame()

            // if (this.frames % 300 == 20) this.createEnemy()
        }, 1000 / this.fps)
    },

    //TICK -------------------------------------------

    createCharacterSel() {

        // this.audio.pause()
        // this.audio.src = "./music/coin.mp3"
        // this.audio.play()
        // this.audio = new Audio("./music/intro.mp3")
        // this.audio.play()
        this.characterSelection = new CharacterSelection(this)
    },

    createIntro() {


        // this.audio = new Audio("./music/intro.mp3")
        // this.audio.play()
        this.introImagePre.instance = new Image()
        // this.introImagePre.instance.src = this.getIntroImageSrc()
        this.introImage.instance = new Image()
        // this.introImage.instance.src = this.getIntroImageSrc()
    },

    getIntroImageSrc(frame) {
        // "./images/intro/ezgif-frame-00" + this.introImage.frame + ".png"
        let imageNumber = frame
        let prefixSrc = "./images/intro/ezgif-frame-"
        if (frame > 174) {
            prefixSrc = "./images/intro2/ezgif-frame-"
            imageNumber = frame - 167
        }
        if (frame > 360) {
            prefixSrc = "./images/intro3/ezgif-frame-"
            imageNumber = frame - 359
        }
        if (imageNumber < 10) imageNumber = "0" + imageNumber
        if (imageNumber < 100) imageNumber = "0" + imageNumber
        return prefixSrc + imageNumber + ".png"
    },


    createTransition() {

        // this.audio.pause()
        // this.audio.src = "./music/transition.mp3"
        // this.audio.play()
        this.transition = new Transition(this)
    },

    createLevel1() {

        // this.createPlayer()
        // this.audio.pause()
        // this.audio.src = "./music/level1.mp3"
        // this.audio.play()
        this.createBackground()
        this.createPowerUp(900)
        this.createPowerUp(1000)
    },

    createMinigame1() {

        // this.createPlayer()
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

    createMinigame2() {

        // this.createPlayer()
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].actorPos.x = 200 * i + 200
            this.players[i].actorPos.z = 100
            this.players[i].actorHead = this.createHead(minigame1.heads[i])
            this.players[i].setSlapHand()
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
        this.characterSelection.draw()
        console.log(this.enemies.length)
    },

    checkIntroFinished() {
        if (this.introImage.frame >= 400) return true
        else return false
    },

    drawIntro() {
        if (this.checkIntroFinished()) this.launchNextLevel()
        if ((this.frames + 5) % 7 == 0) {
            this.introImagePre.frame++
            this.introImagePre.instance.src = this.getIntroImageSrc(this.introImagePre.frame)
        }
        if (this.frames % 7 == 0) {
            this.introImage.frame++
            this.introImage.instance.src = this.getIntroImageSrc(this.introImage.frame)
        }
        this.ctx.drawImage(
            this.introImagePre.instance,
            0,
            0,
            this.gameSize.w,
            this.gameSize.h)
        this.ctx.drawImage(
            this.introImage.instance,
            0,
            0,
            this.gameSize.w,
            this.gameSize.h)
    },

    drawTransition() {

        this.transition.draw()
        // this.characterSelEntries.forEach(entry => entry.draw())
    },

    drawLevel1() {
        if (this.players.length > 0) this.updateBgSpeed()

        this.background.draw()
        this.players.forEach(player => player.draw())
        this.drawBullets()
        this.drawEnemies()
        this.drawPowerUps()
        this.tryDrawGameOver()
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

    drawMinigame2() {
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
            const levelContent = levelsData[this.level.index].content
            for (let i = 0; i < levelContent.length; i++) {
                if (!levelContent[i].spawned && levelContent[i].location <= this.bgPosition.x) {
                    levelContent[i].spawned = true
                    this.createEnemies(levelContent[i].enemies)
                    this.enemies.forEach(enemy => enemy.chase())
                }
            }
        }


    },

    createPlayer() {
        this.players.push(new Player(this, 200, 0, 15, 200, 200, this.playerKeys[this.players.length], this.players.length))
        this.players[this.players.length - 1].setEventHandlers()
        console.log("playercreated")
    },

    createEnemies(enemies) {

        enemies.forEach(enemy => this.createEnemy(enemy))
        // enemiesStr.forEach(enemyStr => {
        //     this.enemies.push(eval(`new ${enemyStr}(this, this.bgPosition.x + 1200, 0, Math.random() * 500 -300, 50, 50)`))
        // })
    },

    createEnemy(enemy) {

        let enemyCreated = undefined
        const randomPos = this.randomPositionOutside()
        if (enemy.location === undefined) enemyCreated = eval(`new ${enemy.class}(this, ${randomPos.x}, ${randomPos.y}, ${randomPos.z}, 100,100)`)
        else enemyCreated = eval(`new ${enemy.class}(this, ${enemy.location.x}, ${enemy.location.y}, ${enemy.location.z}, 100,100)`)
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
        this.background = new Background(this, this.gameSize.w, this.gameSize.h, "./images/bgSimpsons1.png")
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
                    this.checkAlive(enemy)
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

    randomPositionOutside() {
        randomPos = { x: 0, y: 0, z: 0 }
        if (Math.random() < 0.5) randomPos.x = this.bgPosition.x + 1200
        else randomPos.x = this.bgPosition.x - 200
        randomPos.y = 0
        randomPos.z = Math.random() * 500 - 300
        return randomPos
        // this.enemies.push(eval(`new ${enemyStr}(this, this.bgPosition.x + 1200, 0, Math.random() * 500 -300, 50, 50)`))
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
        distance = Math.sqrt(Math.abs(a * a + b * b + c * c))
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
        if (this.players.length == 0) this.showGameOver()
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

    changeCharacter(direction, playerIndex) {
        this.characterSelection.moveHand(direction, playerIndex)
    },

    selectCharacter(playerIndex) {

        this.characterSelection.selectCharacter(playerIndex)
        let hand = undefined
        if (playerIndex == 0) hand = this.characterSelection.hand1Position
        else hand = this.characterSelection.hand2Position
        this.players[playerIndex].playerCharacter = characterSelData.characters[hand].character
        // console.log(this.players[playerIndex].playerCharacter)
    },

    showGameOver() {
        this.gameOver.enabled = true
    },

    hideGameOver() {
        this.gameOver.transparency = 0
        this.gameOver.enabled = false
    },

    returnToCharacterSel() {
        for (let i = 1; i < levelsData.length; i++) {
            levelsData[i].started = false
        }
        this.hideGameOver()
        this.createPlayer()
        this.enemies = []
        this.powerUps = []
        this.bullets = []
        this.heads = []
        this.launchNextLevel()
    },

    tryDrawGameOver() {
        if (this.gameOver.enabled) {
            console.log("drawing gameover")
            if (this.gameOver.transparency <= 1) this.gameOver.transparency += 0.001
            // this.ctx.globalAlpha = this.gameOver.transparency
            this.ctx.drawImage(this.gameOver.instance, 0, 0, this.gameSize.w, this.gameSize.h)
            // this.ctx.globalAlpha = 1
            console.log("gameover")
        }
    }
    //////////////// NIVEL 2
}


