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
        this.context.drawImage(bulletImg.img, bulletImg.red.x, bulletImg.red.y, bulletImg.red.width, bulletImg.red.height, this.x - (bulletImg.red.width / 2),
            this.y - (bulletImg.red.height), bulletImg.red.width, bulletImg.red.height);
        // context.beginPath();
        // context.arc(this.x, this.y, this.radius, ToRadians(0), ToRadians(360));
        // context.closePath();
        // context.fillStyle = this.color;
        // context.fill();
    }
    Shoot(arrow) {
        if (!this.MoveUp()) {
            arrow.shots--;
            return false;
        } else {
            this.Draw();
            return true;
        }
    }
}