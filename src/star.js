class Star {
    constructor() {
        this.img = new Image();
        this.img.src = 'assets/star1.png';
        this.arr = [];
        for (let i = 0; i < 50; i++) {
            this.arr.push({
                y: getRandomNumber(-10, 1000),
                x: getRandomNumber(3, 3000),
                move: getRandomNumber(1, 3),
            })
        }
    }
    Draw() {
        for (let i = 0; i < 50; i++) {
            this.arr[i].y = this.arr[i].y + this.arr[i].move;
            if (this.arr[i].y >= 900) this.arr[i].y = getRandomNumber(-10, -50);
            context.drawImage(
                this.img,
                this.arr[i].x,
                this.arr[i].y,
            );
        }

    }
}