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
        // this.context.arc(this.x, this.y - (bulletImg.position.height) + 10, this.radius, this.ToRadians(0), this.ToRadians(360));
        // this.context.closePath();
        // this.context.fillStyle = 'white';
        // this.context.fill();

        this.context.drawImage(
            this.img.img,
            this.img.position.x,
            this.img.position.y,
            this.img.position.width,
            this.img.position.height,
            this.x - (this.img.position.width / 2),
            this.y - (this.img.position.height),
            this.img.position.width,
            this.img.position.height
        );
    }

    GetHitBox() {
        return {
            x: this.x,
            y: this.y - (bulletImg.position.height) + 10,
            height: this.y
        }
    }
}