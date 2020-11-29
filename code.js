let time = 5000;
let bulletLimit = 5;
let can;
let context;
let rect;
let width = 65;//getRandomNumber(50, 100);
let height = 100;//getRandomNumber(50, 100);
let player;
let bImg = new Image();
let map = [];
bImg.src = 'assets/background.png';
let bulletImg = {
  img: new Image(),
  red: { width: 70, height: 110, x: 200, y: 310 },
}

bulletImg.img.src = 'assets/beams.png';
let bgY = 0;
let weapon = new Weapon();
let movement = new Movement();
let enemy;


let bodyElem = document.getElementById("body");
bodyElem.onkeydown = bodyElem.onkeyup = (event) => {
  movement.Handle(event);
  weapon.Handle(event);
};

function ToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function loadBody() {
  can = document.getElementById("canvas");
  can.width = document.body.clientWidth;
  can.height = document.body.clientHeight;
  context = can.getContext("2d");

  player = new Player(
    can,
    context,
    getRandomNumber(0, can.width - width),
    getRandomNumber(0, can.height - height),
  );

  enemy = [new Enemy(
    can,
    context,
    getRandomNumber(0, can.width - width)
  )];
}

function RunGame() {
  context.clearRect(0, 0, can.width, can.height);
  context.drawImage(bImg, 0, bgY);
  context.drawImage(bImg, bImg.width, bgY);
  bgY++;
  if (bgY >= can.height) bgY = 0;
  context.drawImage(bImg, 0, bgY - bImg.height);
  context.drawImage(bImg, bImg.width, bgY - bImg.height);

  if (movement.up) {
    player.MoveUp();
  }

  if (movement.down) {
    player.MoveDown();
  }

  if (movement.left) {
    player.MoveLeft();
  }

  if (movement.right) {
    player.MoveRight();
  }

  weapon.Shoot(player, context);
  player.Draw();
  weapon.b.forEach((w, iB) => {
    enemy.forEach((e, i) => {
      if (w.GetHitBox().x >= e.GetHitBox().x && w.GetHitBox().x <= e.GetHitBox().width && w.GetHitBox().y <= e.GetHitBox().height) {
        weapon.b.splice(iB, 1)
        enemy.splice(i, 1)
        NewEnemy();
      }
    });
  });
  enemy.forEach(element => {
    element.Movement();
    element.Draw();
  });
}

function NewEnemy() {
  enemy.push(new Enemy(
    can,
    context,
    getRandomNumber(0, can.width - width)
  ))
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

setInterval(RunGame, 100);

setInterval(NewEnemy, time);
