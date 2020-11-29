class Enemy {
    constructor(canvas, context, x = 10, y = 10, dX = 10, dY = 10, width = 120, height = 65) {
        width,
            height,
            getRandomColor(),
            this.x = x;
        this.y = 10;
        this.dX = dX;
        this.dY = dY;
        this.image = new Image();
        this.image.src = 'assets/enemy1.png';
        this.width = width;
        this.height = height;
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
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);

        // this.context.beginPath();
        // this.context.fillStyle = 'white';
        // this.context.fillRect(this.x, this.y, this.width, this.height);
        // this.context.stroke();

    }

    Movement() {
        let newX = this.x - this.dX;
        let newY = this.y - this.dY;

        if (newY < 0 || newY > 50) {
            this.dY = -this.dY;
        }


        if (getRandomNumber(0, 100) <= 5) this.dX = -this.dX;
        if ((newX + this.width >= this.canvas.width) || (newX <= 0)) {
            this.dX = -this.dX;
        }
        this.x = newX;
        this.y = newY;
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

    GetHitBox() {
        return {
            x: this.x,
            y: this.y,
            height: this.height + this.y,
            width: this.width + this.x
        }
    }
}