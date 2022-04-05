class Background {

    constructor(app, width, height, imgSource) {
        this.app = app
        this.bgPos = { x: 0, y: 0 }
        this.bgSize = { w: width, h: height }
        this.image = undefined
        this.imageSrc = imgSource



        this.init()
    }

    init() {
        this.image = new Image()
        this.image.src = this.imageSrc
    }

    draw() {
        this.move()
        this.app.ctx.drawImage(
            this.image,
            this.app.bgPosition.x / this.app.screenSizeMultipler,
            this.app.bgPosition.y / this.app.screenSizeMultipler,
            302,
            224,
            0,
            0,
            this.app.gameSize.w,
            this.app.gameSize.h)
        // this.ctx.drawImage(this.image, this.bgPos.x, this.bgPos.y, this.bgSize.w, this.bgSize.h)
        // this.ctx.drawImage(this.image, this.bgPos.x + this.bgSize.w, this.bgPos.y, this.bgSize.w, this.bgSize.h)

    }

    move() {
        if (this.posX <= -this.width) {
            this.posX = 0;
        }
        this.posX -= this.velX;
    }
}




    // constructor(ctx, w, h, imgSource) {
    //     this.ctx = ctx;
    //     this.width = w;
    //     this.height = h;

    //     this.image = new Image();
    //     this.image.src = imgSource;

    //     this.posX = 0;
    //     this.posY = 0;

    //     this.velX = 1;
    // }