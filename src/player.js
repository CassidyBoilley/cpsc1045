class Player {
    constructor(x, y, dX, dY, width, height, color, canvas, context) {
        this.x = x;
        this.y = y;
        this.dX = dX;
        this.dY = dY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.canvas = canvas;
        this.context = context;
        this.wall = {
            left: 0,
            top: 0,
            right: this.canvas.width,
            bottom: this.canvas.height
        }
    }

    Draw() {
        this.context.drawImage(pImg, this.x, this.y, this.width, this.height);
        // this.context.beginPath();
        // this.context.fillStyle = this.color;
        // this.context.fillRect(this.x, this.y, this.width, this.height);
        // this.context.stroke();
        // this.context.drawImage(pImg, this.x, this.y, this.width, this.height);
    }

    MoveUp() {
        let newY = this.y - this.dY;

        if (!(newY <= 0)) {
            this.y = newY;
        }
    }

    MoveDown() {
        let newY = this.y + this.dY;

        if (!(newY + this.height >= this.canvas.height)) {
            this.y = newY;
        }
    }

    MoveLeft() {
        let newX = this.x - this.dX;

        if (!(newX <= 0)) {
            this.x = newX;
        }
    }

    MoveRight() {
        let newX = this.x + this.dX;

        if (!(newX + this.width >= this.canvas.width)) {
            this.x = newX;
        }
    }
}