class Weapon {
    constructor() {
        this.fire = 'off';
        this.bullets = 0;
        this.bulletsLimit = 5;
        this.typeShot = 'single';
        this.keyPressed = false;
        this.burst = 3;
        this.b = [];
        this.player;
        this.spreadBulletImg = {
            img: new Image(),
            red: { width: 20, height: 110, x: 5, y: 10 },
        }
        this.spreadBulletImg.img.src = 'assets/beams.png';
    }

    Handle(event) {
        if (event.key === "f" && event.type == "keydown" && !this.keyPressed) {
            this.keyPressed = true;
            this.fire = true;
        } else if (event.key === "f" && event.type == "keyup") {
            this.keyPressed = false;
        }
    }

    Shoot(player, context) {
        this.player = player;
        if (this.fire == true) {
            if (this.player.exp <= 5) {
                this.SingleShot(player, context)
            } else if (this.player.exp <= 10) {
                this.bulletsLimit = 15;
                this.BurstShot(player, context)
            } else if (this.player.exp <= 20) {
                this.bulletsLimit = 15;
                this.SpreadShot(player, context)
            }
        }
        this.b.forEach((element, i) => {
            if (!element.MoveUp()) {
                this.b.splice(i, 1);
            } else {
                element.Draw();
            }

        });
    }

    SpreadShot(player, context) {
        if (this.b.length < this.bulletsLimit) {
            this.fire = false;
            this.b.push(new Bullet((player.x + (player.width / 2)), player.y + 20, 5, 10, 30, context, false, player.img));
            this.b.push(new Bullet(player.x, player.y + 50, 5, 10, 30, context, false, player.img));
            this.b.push(new Bullet((player.x + player.width), player.y + 50, 5, 10, 30, context, false, player.img));
        }
    }

    BurstShot(player, context) {
        if (this.b.length < this.bulletsLimit) {
            this.fire = false;
            this.b.push(new Bullet((player.x + (player.width / 2)), player.y + 20, 5, 10, 30, context, false, player.img));
            this.b.push(new Bullet((player.x + (player.width / 2)), player.y + 80, 5, 10, 30, context, false, player.img));
            this.b.push(new Bullet((player.x + (player.width / 2)), player.y + 140, 5, 10, 30, context, false, player.img));
        }
    }

    SingleShot(player, context) {
        if (this.b.length < this.bulletsLimit) {
            this.fire = false;
            this.b.push(new Bullet((player.x + (player.width / 2)), player.y + 20, 5, 10, 30, context, false, this.spreadBulletImg));
        }
    }
}