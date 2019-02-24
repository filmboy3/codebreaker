let paddle;
let ball;
let bricks = [];

let playingGame = false;
let youWin = false;
let winText;
let hitBrick;
let counter = 0;
let winCounter = 0;

let tags;
let music;
let winStatus = 0;
let windows;
let paddleBounce;
let trueError;

function preload() {
    windows = loadSound("sounds/WindowsError.mp3");
    paddleBounce = loadSound("sounds/newBounce.mp3");
    trueError = loadSound("sounds/TrueError.mp3");
    macError = loadSound("sounds/Mac_Error.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage('images/./trex.png'); 
  img2 = loadImage('images/./OtherError.png');
  bg = loadImage('images/./ComputerBG.png');
  pinwheel = loadImage('images/./MacPinwheel.png');
  openingImg = loadImage('images/./OpeningPage.png');
  loseImg = loadImage('images/./ErrorPage.png');
  winImg = loadImage('images/./WinPage.png');
  stack = loadImage('images/./Stack.png');
  winSound = loadSound("sounds/OtherSuccess.mp3");
  loseSound = loadSound("sounds/LoseGame.mp3");
  music = loadSound("sounds/dont_stop_believing.mp3");
  paddle = new Paddle();
  ball = new Ball();

  for (let i = 0; i < 20; i++) {
    bricks.push(new Brick());
  }
}

function draw() {
  background(bg);
  // bricks
  for (let i = 0; i < bricks.length; i++) {
    tags = bricks[i].display();
    if (bricks[i].r >= 40) {
        bricks[i];
        image(img, tags[0], tags[1], tags[2], tags[2])
    } else {
        image(img2, tags[0], tags[1], tags[2], tags[2])
    }
    
    if (ball.hits(bricks[i])) {
        if (!trueError.isPlaying()) {
            trueError.play();
        } else {
            windows.play();
        }
      if (bricks[i].r >= 40) {
        
        bricks[i].r = bricks[i].r / 2;
      } else {
        bricks.splice(i, 1);
      }
      ball.direction.y *= -1;
    }
  }

  // paddle
  paddle.display();
  if (playingGame) {
    if (counter === 0) {
      try {
        music.amp(.2);
        music.play();
        counter++;
      } catch(e) {
          console.log(e)
        }
    }
    paddle.checkEdges();
  } 
  if (playingGame) {
    winCounter = 0;
    paddle.update();
    image(stack, paddle.pos.x, paddle.pos.y, paddle.w, paddle.h);
  }
  if (!playingGame) {
      image(pinwheel, width / 2 - ball.r * 1.5, height / 2 - ball.r * 1.5, ball.r*3, ball.r*3);
      image(stack, paddle.pos.x, paddle.pos.y, paddle.w, paddle.h);
      if (winStatus === 0) {
        image(openingImg, width / 4, height / 8);
      } else if (winStatus === 1) {
        if (!winSound.isPlaying() && winCounter === 0) {
          winSound.play();
          winCounter = 1;
        }
        image(winImg, width / 2 - height / 4); 
      } else {
        image(loseImg, width / 2 - height / 2); 
      }
  };
 

  // ball
  if (ball.meets(paddle)) {
    paddleBounce.play();
    if (ball.direction.y > 0) ball.direction.y *= -1;
  }
  ball.display();
  if (playingGame) ball.checkEdges(macError);
  if (playingGame) {
      ball.update();
      image(pinwheel, ball.pos.x - ball.r * 1.5, ball.pos.y - ball.r * 1.5, ball.r*3, ball.r*3);
  }

  // game logics
  if (ball.pos.y > height) {
    winStatus = -1;
    music.stop();
    counter = 0;
    loseSound.play();
    ball.pos = createVector(width / 2, height / 2);
    playingGame = false;
  }

  if (bricks.length === 0) {
    winStatus = 1;
    music.stop();
    counter = 0;
    youWin = true;
    playingGame = false;
  }

}

function keyReleased() {
  paddle.isMovingRight = false;
  paddle.isMovingLeft = false;
}

function keyPressed() {
  if (key === 'a' || key === 'A') {
    paddle.isMovingLeft = true;
  } else if (key === 'd' || key === 'D') {
    paddle.isMovingRight = true;
  } else if (key === 's' || key === 'S') {
    if (bricks.length === 0) {
      for (let i = 0; i < 20; i++) {
        bricks.push(new Brick());
      }
    }
    playingGame = true;
    youWin = false;
  }
}
