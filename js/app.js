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
    gameLocked: false,
    delay: { start: 0, end: 0 },

    gameOver: { instance: undefined, source: "./images/misc/gameOver.png", enabled: false },
    gameCompleted: { instance: undefined, source: "./images/misc/completed.png", enabled: false },

    //pre to avoid flickering
    introImagePre: { instance: undefined, frame: 7, totalFrames: 300 },
    introImage: { instance: undefined, frame: 7, totalFrames: 300 },
    minigameBg: { instance: undefined, source: "./images/minigame/bg2.png" },
    hurryImage: { instance: undefined, source: "./images/misc/hurry.png", enabled: false },
    startButton: { instance: undefined, source: "./images/misc/pressEnter.png" },
    minigameEnded: false,


    player2alreadyAdded: false,
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
    sfxAudio: { instance1: undefined, instance2: undefined, instance3: undefined, instance4: undefined, index: 0 },
    bgSpeed: { x: 0, y: 0 },
    bgLastMovement: 0,
    enemiesLastAlive: 0,
    gameSize: { w: undefined, h: undefined },
    frames: 0,
    playerKeys: [{ jump: " ", top: "ArrowUp", right: "ArrowRight", down: "ArrowDown", left: "ArrowLeft", attack: "m" },
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
        this.players[this.players.length - 1].setEventHandlers()


        this.audio = new Audio
        this.gameOver.instance = new Image()
        this.gameOver.instance.src = this.gameOver.source

        this.gameCompleted.instance = new Image()
        this.gameCompleted.instance.src = this.gameCompleted.source

        this.startButton.instance = new Image()
        this.startButton.instance.src = this.startButton.source

        this.gameCompleted.instance = new Image()
        this.gameCompleted.instance.src = this.gameCompleted.source

        this.hurryImage.instance = new Image()
        this.hurryImage.instance.src = this.hurryImage.source

        this.sfxAudio.instance1 = new Audio
        this.sfxAudio.instance2 = new Audio
        this.sfxAudio.instance3 = new Audio
        this.sfxAudio.instance4 = new Audio


        // this.drawBlackScreen()
        this.drawStartButton()

        // this.launchLevel(5)


    },

    drawStartButton() {
        this.currentInterval = setInterval(() => {
            this.clearAll()
            this.drawBlackScreen()
            this.ctx.drawImage(
                this.startButton.instance,
                this.gameSize.w / 2 - 200,
                this.gameSize.h / 2 - 25,
                400,
                50)
        }, 1000 / this.fps)

    },

    drawBlackScreen() {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    addPlayer2() {
        this.createPlayer()
        if (!this.player2alreadyAdded) {
            this.players[this.players.length - 1].setEventHandlers()
            this.player2alreadyAdded = true
        }

        this.characterSelection.hand2Position = 0
        while (this.characterSelection.hand2Position == this.characterSelection.hand1Position) this.characterSelection.hand2Position++

    },

    addPlayer2InGame() {
        this.createPlayer()
        if (!this.player2alreadyAdded) {
            this.players[this.players.length - 1].setEventHandlers()
            this.player2alreadyAdded = true
        }
        this.players[this.players.length - 1].actorPos.x = this.bgPosition.x + 400

        this.characterSelection.hand2Position = 0
        while (this.characterSelection.hand2Position == this.characterSelection.hand1Position) this.characterSelection.hand2Position++
        this.characterSelection.playSelectedAudio(this.players[this.players.length - 1].playerCharacter)

        // this.players.forEach(player => player.actorPos = { x: 0, y: 0, z: 0 })
        // this.bgPosition.x = 0

    },

    setDimensions() {
        this.gameSize = {
            w: 302 * this.screenSizeMultipler,
            h: 224 * this.screenSizeMultipler,
        }
        this.canvasNode.setAttribute('width', this.gameSize.w)
        this.canvasNode.setAttribute('height', this.gameSize.h)
    },

    launchNextLevel() {
        console.log("trylaunching next level")
        this.players.forEach(player => player.actorPos = { x: 100 + this.players.indexOf(player) * 200, y: 0, z: 0 })
        this.bgPosition.x = 0

        for (let i = 0; i < levelsData.length; i++) {
            if (levelsData[i].started == false) {
                console.log("we will launch", i, "level")
                this.launchLevel(i)
                break
            }
        }





    },

    launchLevel(index) {
        this.level.name = levelsData[index].name
        this.level.type = levelsData[index].type
        this.level.index = index
        this.enemies = []
        this.players.forEach(player => player.state = "idle")


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
            case 4: this.startTransition2()
                break
            case 5: this.startMinigame1()
                break
            case 6: this.startTransition()
                break
            case 7: this.startLevel2()
                break
        }
        levelsData[index].started = true

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
        this.bgLastMovement = this.frames
        this.currentInterval = setInterval(() => {
            this.clearAll()
            this.collectGarbage()
            this.drawLevel()
            this.manageFrames()
            this.drawFrame()
            this.checkBulletsCollisions()
            this.checkPowerUpCollisions()
            this.readLevelData()
            if (this.gameCompleted.enabled == false) this.checkGameCompleted()
            else this.execDelayLaunchNextLevel()
            if (this.players.length == 0 && this.gameOver.enabled == false) this.showGameOver()

            // if (this.frames % 300 == 20) this.createEnemy()
        }, 1000 / this.fps)
    },

    startLevel2() {

        // this.level.name = "level1"
        // this.level.type = "level"

        this.createLevel2()
        this.bgLastMovement = this.frames
        this.currentInterval = setInterval(() => {
            this.clearAll()
            this.collectGarbage()
            this.drawLevel()
            this.manageFrames()
            this.drawFrame()
            this.checkBulletsCollisions()
            this.checkPowerUpCollisions()
            this.readLevelData()
            if (this.gameCompleted.enabled == false) this.checkGameCompleted()
            else this.execDelayLaunchNextLevel()
            if (this.players.length == 0 && this.gameOver.enabled == false) this.showGameOver()

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
            if (this.gameCompleted.enabled) this.execDelayLaunchNextLevel()

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

    startTransition2() {

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

    setDelayLaunchNextLevel(seconds) {
        this.delay.start = this.frames
        this.delay.end = this.frames + this.fps * seconds
    },

    execDelayLaunchNextLevel() {
        if (this.frames > this.delay.end) {
            this.hideCompleted()
            this.launchNextLevel()
            this.delay = { start: 0, end: 0 }
        }
    },

    createIntro() {


        // this.audio = new Audio("./music/intro.mp3")
        // this.audio.play()
        this.introImagePre.instance = new Image()
        // this.introImagePre.instance.src = this.getIntroImageSrc()
        this.introImage.instance = new Image()
        // this.introImage.instance.src = this.getIntroImageSrc()
    },
    // 4, 376251
    // 21, 639997

    getIntroImageSrc(frame) {
        // "./images/intro/ezgif-frame-00" + this.introImage.frame + ".png"
        let imageNumber = frame
        let prefixSrc = "./images/introAnim/introP1/ezgif-frame-"
        if (frame > 167) {
            prefixSrc = "./images/introAnim/introP2/ezgif-frame-"
            imageNumber = frame - 167
        }
        if (frame > 348) {
            prefixSrc = "./images/introAnim/introP3/ezgif-frame-"
            imageNumber = frame - 348
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
        this.createPowerUp(3200)
        this.createPowerUp(4200)
    },

    createLevel2() {

        // this.createPlayer()
        // this.audio.pause()
        // this.audio.src = "./music/level1.mp3"
        // this.audio.play()
        this.createBackground()
        this.createPowerUp(1500)
    },

    createMinigame1() {

        this.minigameBg.instance = new Image()
        this.minigameBg.instance.src = this.minigameBg.source
        // this.createPlayer()
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].actorPos.x = 220 * i + 190
            this.players[i].actorPos.y = 0
            this.players[i].actorPos.z = 30
            this.players[i].actorHead = this.createHead(minigame1.heads[i])
            this.players[i].actorHead.image.instance.src = "./images/minigame/" + this.players[i].playerCharacter + ".png"
            this.players[i].actorHead.bluePos.x = 250 * i + 180
            this.players[i].actorHead.bluePos.y = 606
            this.players[i].stopAnimation = true
            this.players[i].actorSize = { w: 300, h: 300 }
            this.players[i].changeState("blow")
        }
        let characterArr = ["homer", "lisa", "marge", "bart"]
        this.players.forEach(player => {
            if (characterArr.indexOf(player.playerCharacter) != -1) characterArr.splice(characterArr.indexOf(player.playerCharacter), 1)
        })
        for (let i = 4 - characterArr.length; i < 4; i++) {
            const newEnemy = this.createEnemy(minigame1.enemies[i])
            newEnemy.actorHead = this.createHead(minigame1.heads[i])
            newEnemy.playerCharacter = characterArr[i - (4 - characterArr.length)]
            newEnemy.actorHead.image.instance.src = "./images/minigame/" + newEnemy.playerCharacter + ".png"
            newEnemy.actorSize = { w: 300, h: 300 }
            newEnemy.actorPos.z = 30
            newEnemy.actorPos.y = 0
            newEnemy.actorPos.x = 250 * i + 180
            newEnemy.actorHead.bluePos.x = 250 * i + 180
            newEnemy.actorHead.bluePos.y = 602
            newEnemy.changeState("blow")
        }
        // for (let i = 0; i < 4; i++) {
        //     let arr = [...this.players]
        //     arr.push(...this.enemies)
        //     const newEnemy = this.createEnemy(minigame1.enemies[i])
        //     newEnemy.actorHead = this.createHead(minigame1.heads[i])
        //     newEnemy.playerCharacter = "bart"


        //     arr.forEach(player => {
        //         if (true) {
        //             while (player.playerCharacter === newEnemy.playerCharacter) {
        //                 newEnemy.playerCharacter = playableCharacters[(playableCharacters.indexOf(newEnemy.playerCharacter) + 1) % playableCharacters.length]
        //             }
        //         }
        //     })
        //     newEnemy.actorHead.image.instance.src = "./images/minigame/" + newEnemy.playerCharacter + ".png"
        //     newEnemy.actorSize = { w: 300, h: 300 }
        //     newEnemy.actorPos.z = 30
        //     newEnemy.actorPos.y = 0
        //     newEnemy.actorPos.x = 250 * i + 180
        //     newEnemy.actorHead.bluePos.x = 250 * i + 180
        //     newEnemy.actorHead.bluePos.y = 602
        //     newEnemy.changeState("blow")
        // }
        // for (let i = 0; i < 4; i++) {
        //     this.createHead(minigame1.heads[i])
        // }
        this.createBackground()
        this.bgPosition = { x: 0, y: 60 }
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
    },

    checkIntroFinished() {
        if (this.introImage.frame >= 400) return true
        else return false
    },

    playSound(source) {
        if (this.sfxAudio.index == 0) {
            this.sfxAudio.instance1.src = source
            this.sfxAudio.instance1.play()
            this.sfxAudio.index = 1
        }
        else if (this.sfxAudio.index == 1) {
            this.sfxAudio.instance2.src = source
            this.sfxAudio.instance2.play()
            this.sfxAudio.index = 2
        }
        else if (this.sfxAudio.index == 2) {
            this.sfxAudio.instance3.src = source
            this.sfxAudio.instance3.play()
            this.sfxAudio.index = 3
        }
        else if (this.sfxAudio.index == 3) {
            this.sfxAudio.instance4.src = source
            this.sfxAudio.instance4.play()
            this.sfxAudio.index = 0
        }



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

    drawLevel() {
        if (this.players.length > 0) this.updateBgSpeed()

        this.background.draw()
        this.drawBullets()
        this.players.forEach(player => player.draw())
        this.drawEnemies()
        this.drawPowerUps()
        this.DrawHurryUp()
        this.tryDrawGameOver()
        this.tryDrawGameCompleted()
    },


    drawMinigame1() {
        this.ctx.drawImage(this.minigameBg.instance, 0, 0, this.gameSize.w, this.gameSize.h)
        this.players.forEach(player => player.draw())
        this.drawEnemies()
        this.heads.forEach(head => head.draw())
    },

    drawMinigame2() {
        this.ctx.drawImage(this.miniBg.instance, 0, 0, this.gameSize.w, this.gameSize.h)
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
            let levelFinished = true
            for (let i = 0; i < levelContent.length; i++) {
                if (!levelContent[i].spawned && levelContent[i].location <= this.bgPosition.x) {
                    levelFinished = false
                    levelContent[i].spawned = true
                    this.createEnemies(levelContent[i].enemies)
                    this.enemies.forEach(enemy => enemy.chase())
                    if (levelContent[i].name == "boss") {
                        this.audio.src = "./music/boss.mp3"
                        this.audio.play()
                    }
                }
            }

        }


    },

    createPlayer() {
        this.players.push(new Player(this, 200, 0, 15, 200, 200, this.playerKeys[this.players.length], this.players.length))
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
        enemyCreated.setHitSound()
        return enemyCreated
    },

    createHead(head) {

        let headRef = eval(`new ${head.class}(this, ${head.location.x}, ${head.location.y}, ${head.location.z}, 100,100)`)
        this.heads.push(headRef)
        return headRef
    },

    createPowerUp(posX) {
        this.powerUps.push(new PowerUp(this, posX, 0, Math.random() * 250, 50, 50, "cat"))
    },

    manageFrames() {
        this.frames++
        if (this.frames >= 5000) {
            this.frames = 0
        }
    },

    createBackground() {
        this.background = new Background(this, this.gameSize.w, this.gameSize.h, levelsData[this.level.index].bg)
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
        if (this.enemies.length != 0) this.enemiesLastAlive = this.frames
    },

    drawPowerUps() {

        this.powerUps.forEach(powerUp => {
            powerUp.draw()
        })
    },

    collectGarbage() {
        this.bullets = this.bullets.filter(bullet => bullet.getDrawPosX() > (0 - bullet.actorSize.w) && bullet.getDrawPosX() <= this.gameSize.w)
        this.enemies = this.enemies.filter(enemy => enemy.isAlive)

        this.players = this.players.filter(player => player.isAlive)
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
                    this.playSound("./SFX/other/hit2.mp3")
                    break
                }
            }
        })
    },

    //simple melee hit, actor A hits actor B, optionally we can add parameters which decide where the hit occurs.
    tryHit(actorA, dmg, radius) {

        if (actorA instanceof Player) {

            let hitFound = false
            this.enemies.forEach(enemy => {
                if (this.checkForCollision(actorA, enemy, radius) && !hitFound) {
                    hitFound = true
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

    finishBlowMinigame() {
        this.audio.pause()
        this.minigameEnded = true
        this.playSound("./music/result.mp3")
        let arr = [...this.players]
        arr.push(...this.enemies)
        let rank = 0

        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i].playerCharacter, arr[i].actorHead.headSize)

        }

        while (arr.length > 0) {
            rank++
            let max = -1
            let maxPlayer = undefined
            for (let i = 0; i < arr.length; i++) {

                if (arr[i].actorHead.headSize > max) {
                    max = arr[i].actorHead.headSize
                    maxPlayer = arr[i]
                }
            }

            maxPlayer.actorHead.resultsImage.enabled = true
            if (rank == 1) maxPlayer.characterLive += 100
            maxPlayer.actorHead.resultsImage.instance.src = "./images/minigame/" + rank + ".png"
            arr.splice(arr.indexOf(maxPlayer), 1)
        }
        this.gameCompleted.enabled = true
        this.setDelayLaunchNextLevel(4)


    },

    //tambien hay que hacer que encuanto encuentre un objetivo que beneficie solo a ese y haga break, por lo que
    //el segundo foreach deberia ser un for clasico
    checkPowerUpCollisions() {

        this.powerUps.forEach(powerUp => {
            this.players.forEach(player => {
                if (this.checkForCollision(powerUp, player, 70)) {
                    this.powerUps.splice(this.powerUps.indexOf(powerUp), 1)
                    this.playSound("./SFX/other/coin3.mp3")
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

    DrawHurryUp() {
        if (this.level.type == "level" && this.frames > this.bgLastMovement + 240 && this.frames > this.enemiesLastAlive + 240) {

            if (this.frames % 40 == 0) {
                this.hurryImage.enabled = !this.hurryImage.enabled
                this.playSound("./SFX/other/ding.mp3")
            }
        }
        else this.hurryImage.enabled = false
        if (this.hurryImage.enabled == true) {
            this.ctx.drawImage(
                this.hurryImage.instance,
                this.gameSize.w - 300,
                this.gameSize.h / 2.3 - 200,
                250,
                330)
        }

    },

    //convendria que comprobase no solo el player 1 sino un compendio de todos
    updateBgSpeed() {

        /// eje X
        if (this.enemies.length > 0) {
            this.bgSpeed.x = 0
        }
        else if (this.players[0].getDrawPosX() >= this.gameSize.w * 0.575 && this.bgPosition.x < this.bgBounds.x - this.bgBounds.y * 1.45) {
            if (this.players[0].actorVel.x > 0) {
                this.bgLastMovement = this.frames
                this.bgSpeed.x = this.players[0].actorVel.x
                this.bgPosition.x += this.bgSpeed.x
            }
            else {
                this.bgSpeed.x = 0
            }

        }
        else if (this.players[0].getDrawPosX() <= this.gameSize.w * 0.2 && this.bgPosition.x > 6) {
            if (this.players[0].actorVel.x < 0) {
                this.bgLastMovement = this.frames
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
        this.playSound(`./SFX/${player.playerCharacter}/02.mp3`)
        player.die()
        // this.players.splice(this.players.indexOf(player), 1)
        // if (this.players.length == 0) this.showGameOver()
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

        if (playerIndex == 0 && !this.characterSelection.playersDone.one || playerIndex == 1 && !this.characterSelection.playersDone.two) {
            console.log("entering again")
            this.characterSelection.selectCharacter(playerIndex)
            let hand = undefined
            if (playerIndex == 0) hand = this.characterSelection.hand1Position
            else hand = this.characterSelection.hand2Position
            this.players[playerIndex].playerCharacter = characterSelData.characters[hand].character
            this.characterSelection.playSelectedAudio(characterSelData.characters[hand].character)
            this.players[playerIndex].characterSelected()
        }

        // console.log(this.players[playerIndex].playerCharacter)
    },

    showGameOver() {
        this.gameOver.enabled = true
        this.audio.src = "./music/gameOver.mp3"
        this.audio.play()
    },

    hideGameOver() {
        this.gameOver.transparency = 0
        this.gameOver.enabled = false
    },

    showCompleted() {
        this.gameCompleted.enabled = true
        this.gameLocked = true
        this.audio.src = "./music/complete.mp3"
        this.audio.play()
    },

    hideCompleted() {
        this.gameCompleted.enabled = false
        this.gameLocked = false
    },

    checkGameCompleted() {
        const levelContent = levelsData[this.level.index].content
        let levelFinished = true
        for (let i = 0; i < levelContent.length; i++) {
            if (!levelContent[i].spawned || this.enemies.length > 0) levelFinished = false
        }
        // levelFinished = true
        if (levelFinished) {
            this.showCompleted()
            this.setDelayLaunchNextLevel(3)
            return true
        }
        else return false

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
        this.gameOver.enabled = false
    },

    tryDrawGameOver() {
        if (this.gameOver.enabled) {
            this.ctx.drawImage(this.gameOver.instance, 0, 0, this.gameSize.w, this.gameSize.h)
        }
    },

    tryDrawGameCompleted() {
        if (this.gameCompleted.enabled) {

            this.ctx.drawImage(this.gameCompleted.instance, 0, 0, this.gameSize.w, this.gameSize.h)
        }
    },
    //////////////// NIVEL 2
}


