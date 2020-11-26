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
  firePress: false,
  shots: 0,
};
let bodyElem = document.getElementById("body");
function ToRadians(degrees) {
  return degrees * Math.PI / 180;
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
  if (event.key === "f" && event.type == "keydown" && !myArrows.firePress) {
    myArrows.firePress = true;
    myArrows.fire = true;
  } else if (event.key === "f" && event.type == "keyup") {
    myArrows.fire = false
    myArrows.firePress = false;
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
      let bullet = new Bullet((arrRect.x + (arrRect.width / 2)), arrRect.y + 20, 5, 10, 10, context);
      let bulletInterval = setInterval(function () {
        if (!bullet.Shoot(myArrows)) clearInterval(bulletInterval);
      }, 100);
      myArrows.fire = false;
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
