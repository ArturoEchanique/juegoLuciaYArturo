class Bullet extends Actor {

    constructor(app, posX, posY, posZ, width, height) {
        super(app, posX, posY, posZ, width, height)
        this.bulletRadius = this.actorSize.w;
        this.init()
    }

    init() {
        this.actorPhysics.gravity = 0;
        this.actorVel = { x: 26, y: 0, z: 0 }
    }

    draw() {
        this.move()
        this.app.ctx.beginPath();
        this.app.ctx.fillStyle = "black";
        this.app.ctx.arc(this.getDrawPosX(), this.getDrawPosY(), this.bulletRadius, 0, Math.PI * 2);
        // this.app.ctx.arc(this.getDrawPosX(), this.getDrawPosY(), this.bulletRadius, 0, Math.PI * 2);
        this.app.ctx.fill();
        this.app.ctx.closePath();

    }

    move() {
        this.actorPos.x += this.actorVel.x
        this.actorPos.y += this.actorVel.y
        this.actorVel.y += this.actorPhysics.gravity
    }
}