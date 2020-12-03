class EnemyBullet {
    constructor(x, y, radius, dX, dY, context, canvas) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dX = dX;
        this.dY = dY;
        this.pulse = 1;
        this.context = context;
        this.canvas = canvas;
    }

    ToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    MoveDown() {
        let newY = this.y + this.dY;

        if ((newY + (this.radius - 1) <= this.canvas.height)) {
            this.y = newY;
            return true
        } else {
            return false;
        }
    }

    Draw() {
        // this.context.beginPath();
        // this.context.arc(this.x, this.y - (enemyBulletImg.position.height) + 10, this.radius, this.ToRadians(0), this.ToRadians(360));
        // this.context.closePath();
        // this.context.fillStyle = 'white';
        // this.context.fill();

        this.context.drawImage(
            enemyBulletImg.img,
            enemyBulletImg.position.x,
            enemyBulletImg.position.y,
            enemyBulletImg.position.width,
            enemyBulletImg.position.height,
            this.x - (enemyBulletImg.position.width / 2),
            this.y - (enemyBulletImg.position.height),
            enemyBulletImg.position.width,
            enemyBulletImg.position.height
        );
    }

    GetHitBox() {
        return {
            x: this.x,
            y: this.y - (enemyBulletImg.position.height),
            height: this.y
        }
    }
}