//import { Player } from './src/player.js'
let bulletLimit = 5;
let can;
let context;
let rect;
let width = 65;//getRandomNumber(50, 100);
let height = 100;//getRandomNumber(50, 100);
let arrRect;
let bImg = new Image();
bImg.src = 'assets/background.png';
let pImg = new Image();
pImg.src = 'assets/spaceship1.png';
let bulletImg = {
  img: new Image(),
  red: { width: 70, height: 110, x: 200, y: 290 },
}

bulletImg.img.src = 'assets/beams.png';
let bgY = 0;
let myMouse = {
  x: -1,
  y: -1
};

let myArrows = {
  up: false,
  down: false,
  right: false,
  left: false,
  fire: false,
  shots: 0,
};
let bodyElem = document.getElementById("body");
function ToRadians(degrees) {
  return degrees * Math.PI / 180;
}

class Player {
  constructor(x, y, dX, dY, width, height, color, canvas, context) {
    this.x = x;
    this.y = y;
    this.dX = dX;
    this.dY = dY;
    this.width = width;
    this.height = height;
    this.color = color;
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
    this.context.drawImage(pImg, this.x, this.y, this.width, this.height);
    // this.context.beginPath();
    // this.context.fillStyle = this.color;
    // this.context.fillRect(this.x, this.y, this.width, this.height);
    // this.context.stroke();
    // this.context.drawImage(pImg, this.x, this.y, this.width, this.height);
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
}

class Circle {
  constructor(x, y, radius, dX, dY, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dX = dX;
    this.dY = dY;
    this.color = color;
    this.pulse = 1;
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
    context.drawImage(bulletImg.img, bulletImg.red.x, bulletImg.red.y, bulletImg.red.width, bulletImg.red.height, this.x - (bulletImg.red.width / 2),
      this.y - (bulletImg.red.height), bulletImg.red.width, bulletImg.red.height);
    // context.beginPath();
    // context.arc(this.x, this.y, this.radius, ToRadians(0), ToRadians(360));
    // context.closePath();
    // context.fillStyle = this.color;
    // context.fill();
  }
}

function loadBody() {
  can = document.getElementById("canvas");
  can.width = document.body.clientWidth;
  can.height = document.body.clientHeight;
  context = can.getContext("2d");

  arrRect = new Player(
    getRandomNumber(0, can.width - width),
    getRandomNumber(0, can.height - height),
    10,
    10,
    width,
    height,
    getRandomColor(),
    can,
    context
  );
  can.addEventListener("click", function (event) {
    let rect = can.getBoundingClientRect();
    myMouse.x = event.clientX - rect.left;
    myMouse.y = event.clientY - rect.top;
  }
  );
}
let map = [];
bodyElem.onkeydown = bodyElem.onkeyup = handle;

function handle(event) {
  if (event.key === "f" && event.type == "keydown") {
    myArrows.fire = true;
  } else if (event.key === "f" && event.type == "keyup") {
    myArrows.fire = false
  }

  if (event.key === "ArrowUp" && event.type == "keydown") {
    myArrows.up = true;
  } else if (event.key === "ArrowUp" && event.type == "keyup") {
    myArrows.up = false
  }


  if (event.key === "ArrowDown" && event.type == "keydown") {
    myArrows.down = true;
  } else if (event.key === "ArrowDown" && event.type == "keyup") {
    myArrows.down = false
  }

  if (event.key === "ArrowLeft" && event.type == "keydown") {
    myArrows.left = true;
  } else if (event.key === "ArrowLeft" && event.type == "keyup") {
    myArrows.left = false
  }


  if (event.key === "ArrowRight" && event.type == "keydown") {
    myArrows.right = true;
  } else if (event.key === "ArrowRight" && event.type == "keyup") {
    myArrows.right = false
  }

}

function CreateRectangles() {
  context.clearRect(0, 0, can.width, can.height);
  context.drawImage(bImg, 0, bgY);
  context.drawImage(bImg, bImg.width, bgY);
  bgY++;
  if (bgY >= can.height) bgY = 0;
  context.drawImage(bImg, 0, bgY - bImg.height);
  context.drawImage(bImg, bImg.width, bgY - bImg.height);

  if (myArrows.up) {
    arrRect.MoveUp();
  }

  if (myArrows.down) {
    arrRect.MoveDown();
  }

  if (myArrows.left) {
    arrRect.MoveLeft();
  }

  if (myArrows.right) {
    arrRect.MoveRight();
  }
  if (myArrows.fire) {
    if (myArrows.shots < bulletLimit) {
      myArrows.shots++;
      let bullet = new Circle((arrRect.x + (arrRect.width / 2)), arrRect.y + 20, 5, 10, 10, "red");
      let bulletInterval = setInterval(function () {
        if (!bullet.MoveUp()) {
          myArrows.shots--;
          clearInterval(bulletInterval);
        } else {
          bullet.Draw();
        }
      }, 100);
    }
  }
  arrRect.Draw();

}



function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomColor() {
  let color = "rgb(";
  color += getRandomNumber(0, 255) + ","
  color += getRandomNumber(0, 255) + ","
  color += getRandomNumber(0, 255) + ")"
  return color;
}

setInterval(CreateRectangles, 100);
