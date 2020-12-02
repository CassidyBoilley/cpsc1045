let runGame;
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

let enemyBulletImg = {
  img: new Image(),
  red: { width: 20, height: 110, x: 5, y: 10 },
}

enemyBulletImg.img.src = 'assets/beams.png';
let bgY = 0;
let weapon = new Weapon();
let movement = new Movement();
let enemy;


let bodyElem = document.getElementById("body");
bodyElem.onkeydown = bodyElem.onkeyup = (event) => {
  if (event.key === 'Escape') StopGame();
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
  context.clearRect(0, 0, can.width, can.height);
  context.drawImage(bImg, 0, bgY);
  context.drawImage(bImg, bImg.width, bgY);
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
        weapon.b.splice(iB, 1);
        if (e.status) {
          player.exp++;
          NewEnemy();
          e.status = 0;
        }
      }
    });
  });

  enemy.forEach((e, i) => {
    e.Shoot();
    if (e.b.length > 0) {
      e.b.forEach(b => {
        if (b.GetHitBox().x >= player.GetHitBox().x && b.GetHitBox().x <= player.GetHitBox().width && b.GetHitBox().height >= player.GetHitBox().y && b.GetHitBox().y <= player.GetHitBox().height) {
          player = "";
          StopGame();
        }
      });
    }
    e.Movement();
    e.Draw()
    if (!e.live) {
      enemy.splice(i, 1);
    }
  });
}

function NewEnemy() {
  if (enemy.length <= 5) {
    enemy.push(new Enemy(
      can,
      context,
      getRandomNumber(0, can.width - width)
    ))
  }
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

function StartGame() {
  document.getElementById('startBtn').style.display = 'none';
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
  runGame = setInterval(RunGame, 100);
}

function StopGame() {
  clearInterval(runGame);
  document.getElementById('startBtn').style.display = 'block';
}


setInterval(NewEnemy, time);
