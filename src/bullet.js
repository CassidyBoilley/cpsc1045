class Bullet {
    constructor(x, y, radius, dX, dY, context, img = false) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dX = dX;
        this.dY = dY;
        this.pulse = 1;
        this.context = context;
        this.img = img ? img : bulletImg;
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
            this.img.img,
            this.img.red.x,
            this.img.red.y,
            this.img.red.width,
            this.img.red.height,
            this.x - (this.img.red.width / 2),
            this.y - (this.img.red.height),
            this.img.red.width,
            this.img.red.height
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