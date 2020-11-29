class Bullet {
    constructor(x, y, radius, dX, dY, context) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dX = dX;
        this.dY = dY;
        this.pulse = 1;
        this.context = context;
    }

    ToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    MoveUp() {
        let newY = this.y - this.dY;

        if ((newY - (this.radius - 1) >= 0)) {
            this.y = newY;
            return true
        } else {
            return false;
        }
    }

    Draw() {
        // this.context.beginPath();
        // this.context.arc(this.x, this.y - (bulletImg.red.height) + 10, this.radius, this.ToRadians(0), this.ToRadians(360));
        // this.context.closePath();
        // this.context.fillStyle = 'white';
        // this.context.fill();

        this.context.drawImage(
            bulletImg.img,
            bulletImg.red.x,
            bulletImg.red.y,
            bulletImg.red.width,
            bulletImg.red.height,
            this.x - (bulletImg.red.width / 2),
            this.y - (bulletImg.red.height),
            bulletImg.red.width,
            bulletImg.red.height
        );
    }

    GetHitBox() {
        return {
            x: this.x,
            y: this.y - (bulletImg.red.height) + 10,
            height: this.y
        }
    }
}