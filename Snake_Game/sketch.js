// snake object
let snake = {
  x: 0,
  y: 0,
  xv: 1,
  yv: 0,
  tail: [],
};

// definitions
const scl = 25;
let cols = 0;
let rows = 0;
let food = {};
let points = 0;

// flag
let keyIsPressed = false;

function setup() {
  createCanvas(450, 450);

  // set the number of columns and rows
  cols = width / scl;
  rows = height / scl;

  // create snake head
  snake.x = floor(width / 2 / scl);
  snake.y = floor(height / 2 / scl);

  // create food
  food = createFood();

  // set Frame Rate
  frameRate(5);
}

function keyPressed() {
  // change direction of snake
  if (keyCode === LEFT_ARROW && snake.xv != 1 && !keyIsPressed) {
    snake.xv = -1;
    snake.yv = 0;
    keyIsPressed = true;
  } else if (keyCode === RIGHT_ARROW && snake.xv != -1 && !keyIsPressed) {
    snake.xv = 1;
    snake.yv = 0;
    keyIsPressed = true;
  } else if (keyCode === UP_ARROW && snake.yv != 1 && !keyIsPressed) {
    snake.xv = 0;
    snake.yv = -1;
    keyIsPressed = true;
  } else if (keyCode === DOWN_ARROW && snake.yv != -1 && !keyIsPressed) {
    snake.xv = 0;
    snake.yv = 1;
    keyIsPressed = true;
  }
}

// generate random food
function createFood() {
  let x = floor(random(cols));
  let y = floor(random(rows));

  return { x, y };
}

function draw() {
  background(0);

  // draw food
  fill(255, 0, 0);
  stroke(255);
  rect(food.x * scl, food.y * scl, scl, scl);

  // check if snake has eaten food
  if (snake.x == food.x && snake.y == food.y) {
    points++;
    food = createFood();
    let tailLength = snake.tail.length;
    let lastSpot = snake.tail[tailLength - 1];

    if(tailLength == 0) {
      snake.tail.push({x: snake.x, y: snake.y});
    } else {
      snake.tail.push({x: lastSpot.x, y: lastSpot.y});
    }
  }

  // check if snake has tail
  if (snake.tail.length > 0) {
    // draw the snake tail
    for (let i = 0; i < snake.tail.length; i++) {
      fill(0, 255, 0);
      rect(snake.tail[i].x * scl, snake.tail[i].y * scl, scl, scl);
    }

    // update tail position
    for (let i = snake.tail.length - 1; i > 0; i--) {
      snake.tail[i].x = snake.tail[i - 1].x;
      snake.tail[i].y = snake.tail[i - 1].y;
    }

    snake.tail[0].x = snake.x;
    snake.tail[0].y = snake.y;
  }

  // draw snake head
  fill(0, 0, 255);
  rect(snake.x * scl, snake.y * scl, scl, scl);

  // update snake head position
  snake.x += snake.xv;
  snake.y += snake.yv;

  // check if snake hits itself
  for (let i = 0; i < snake.tail.length; i++) {
    if (snake.x == snake.tail[i].x && snake.y == snake.tail[i].y) {
      console.log("Game Over");
      noLoop();
    }
  }

  // prevent quick button presses
  keyIsPressed = false;

  // draw text
  textSize(scl);
  fill(255);
  text(points, scl, scl * 1.3);

  // check if snake has hit the wall
  if (snake.x < 0) {
    snake.x = cols - 1;
  } else if (snake.x > cols - 1) {
    snake.x = 0;
  } else if (snake.y < 0) {
    snake.y = rows - 1;
  } else if (snake.y > rows - 1) {
    snake.y = 0;
  }
}
