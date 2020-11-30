class Weapon {
    constructor() {
        this.fire = 'off';
        this.bullets = 0;
        this.bulletsLimit = 5;
        this.typeShot = 'single';
        this.keyPressed = false;
        this.burst = 3;
        this.b = [];
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

        if (this.fire == true) {
            if (this.typeShot == 'single') {
                this.SingleShot(player, context)
            }
            if (this.typeShot == 'burst') {
                this.BurstShot(player, context)
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

    BurstShot(player, context) {
        // for(let i = 0; i < this.burst; i++){
        //     let b = new Bullet((player.x + (player.width / 2)), player.y + 20, 5, 10, 10, context);
        //     let bulletInterval = setInterval(function () {
        //         if (!b.MoveUp()){
        //             clearInterval(bulletInterval);
        //         }else{
        //           b.Draw();
        //         }
        //     }, 100);
        //     this.fire = false;
        // }
        console.log('aqui')
    }

    SingleShot(player, context) {
        if (this.b.length < this.bulletsLimit) {
            this.fire = false;
            this.b.push(new Bullet((player.x + (player.width / 2)), player.y + 20, 5, 10, 30, context, false, player.img));
        }
    }
}