class Weapon {
    constructor() {
        this.fire = 'off';
        this.bullets = 0;
        this.bulletsLimit = 5;
        this.typeShot = 'single';
        this.keyPressed = false;
        this.b = [];
        this.player;
        this.bulletImg = {
            img: new Image(),
            position: { width: 20, height: 110, x: 5, y: 10 },
        }
        this.bulletImg.img.src = 'assets/beams.png';
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
                this.bulletsLimit = 9;
                this.BurstShot(player, context)
            } else if (this.player.exp <= 20) {
                this.bulletsLimit = 9;
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
        this.bulletImg = {
            img: new Image(),
            position: { width: 50, height: 90, x: 70, y: 300 },
        }
        this.bulletImg.img.src = 'assets/beams.png';
        if (this.b.length < this.bulletsLimit) {
            this.fire = false;
            this.b.push(new Bullet((player.x + (player.width / 2)), player.y + 20, 5, 10, 30, context, this.bulletImg));
            this.b.push(new Bullet(player.x, player.y + 50, 5, 10, 30, context, this.bulletImg));
            this.b.push(new Bullet((player.x + player.width), player.y + 50, 5, 10, 30, context, this.bulletImg));
        }
    }

    BurstShot(player, context) {
        this.bulletImg = {
            img: new Image(),
            position: { width: 50, height: 50, x: 3, y: 180 },

        }
        this.bulletImg.img.src = 'assets/beams.png';
        if (this.b.length < this.bulletsLimit) {
            this.fire = false;
            this.b.push(new Bullet((player.x + (player.width / 2)), player.y + 20, 5, 10, 30, context, this.bulletImg));
            this.b.push(new Bullet((player.x + (player.width / 2)), player.y + 80, 5, 10, 30, context, this.bulletImg));
            this.b.push(new Bullet((player.x + (player.width / 2)), player.y + 140, 5, 10, 30, context, this.bulletImg));
        }
    }

    SingleShot(player, context) {
        this.bulletImg = {
            img: new Image(),
            position: { width: 20, height: 30, x: 3, y: 120 },
        }
        this.bulletImg.img.src = 'assets/beams.png';
        if (this.b.length < this.bulletsLimit) {
            this.fire = false;
            this.b.push(new Bullet((player.x + (player.width / 2)), player.y + 20, 5, 10, 30, context, this.bulletImg));
        }
    }
}