let lastTime = 0
let score = 0
let gameOverVar = false
let inputDirection = { x: 0, y: 0 }
let lastDirection = { x: 0, y: 0 }
let food = {
  x: Math.floor(Math.random() * 19) + 1,
  y: Math.floor(Math.random() * 19) + 1
}
const snake = [{ x: 10, y: 10 }]
const board = document.getElementById('board')
const speed = 5
const incrementRate = 1
const snakeIncrement = 0

// This function tells the browser which animation that you want to perform,
// and have it update the animation and call the function before the next repaint.
function main(currentTime) {
  if (gameOver(!gameOverVar)) {
    alert('you lose')
  }
  window.requestAnimationFrame(main)
  if ((currentTime - lastTime) / 1000 < 1 / speed) {
    return
  }
  lastTime = currentTime
  board.innerHTML = ''
  draw(board)
  update()

  if (eatFood(food)) {
    incrementSnake()
  }
}

function update() {
  inputDirection = direction()
  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] }
  }
  // update head based on input direction
  snake[0].x += inputDirection.x
  snake[0].y += inputDirection.y

  // if (eatFood(food)) {
  //   incrementSnake()
  // }

  console.log(snake.length, 'this is the length')
}

// This function is to display snake and food
function draw(board) {
  snake.forEach((position) => {
    // display snake
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = position.y
    snakeElement.style.gridColumnStart = position.x
    snakeElement.classList.add('snake')
    board.appendChild(snakeElement)

    // display food
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
  })
}

function direction() {
  lastDirection = inputDirection
  return inputDirection
}

window.requestAnimationFrame(main)

window.addEventListener('keydown', keyDown)

// This function is to move a snake using arrow keys
function keyDown(e) {
  // left
  if (e.keyCode === 37) {
    if (lastDirection.x !== 0) {
    } else inputDirection = { x: -1, y: 0 }
  }
  // up
  if (e.keyCode === 38) {
    if (lastDirection.y !== 0) {
    } else inputDirection = { x: 0, y: -1 }
  }
  // right
  if (e.keyCode === 39) {
    inputDirection = { x: 1, y: 0 }
    if (lastDirection.x !== 0) {
    } else inputDirection = { x: 1, y: 0 }
  }
  // down
  if (e.keyCode === 40) {
    if (lastDirection.y !== 0) {
    } else inputDirection = { x: 0, y: 1 }
  }
}

function incrementSnake() {
  snakeIncrement += incrementRate
}

// function scoreCount() {
//   score++
//   return 'score is counted'
// }

// This function is to make a snake longer once it eats food
function eatFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    snake.unshift({
      x: snake[0].x + inputDirection.x,
      y: snake[0].y + inputDirection.y
    })
    let [xPo, yPo] = foodRandomPosition()
    food = {
      x: xPo,
      y: yPo
      // x: 1,
      // y: 1
    }
    score++
    console.log(score)
  }
}

// This function is to generate random food
function foodRandomPosition() {
  xPosition = Math.floor(Math.random() * 19) + 1
  yPosition = Math.floor(Math.random() * 19) + 1
  let valid = false
  // to prevent foods from appearing in the path the snake is passing by
  while (valid) {
    for (let i = 0; i < snake.length; i++) {
      if (xPosition !== snake[i].x && yPosition !== snake[i].y) {
        valid = true
        break
      } else {
        xPosition = Math.floor(Math.random() * 19) + 1
        yPosition = Math.floor(Math.random() * 19) + 1
        break
      }
    }
  }
  return [xPosition, yPosition]
}

function gameOver() {
  // death = outsideGrid(getSnake()) || sankeBody()
  // let snakeheadX = snake[0].x + inputDirection.x
  // let snakeheadY = snake[0].y + inputDirection.y

  while (gameOverVar)
    for (let i = 0; i < snake.length; i++) {
      let segment = snake[i]
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        gameOverVar = true
        break
      }
      if (
        snake[0].x < 1 ||
        snake[0].x > 19 ||
        snake[0].y < 1 ||
        snake[0].y > 19
      ) {
        gameOverVar = true
        break
      }
    }
}

// citation
// https://www.youtube.com/watch?v=QTcIXok9wNY
// https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame
// https://www.freecodecamp.org/news/how-to-build-a-snake-game-in-javascript/
// https://css-tricks.com/how-to-create-neon-text-with-css/
// https://www.educative.io/blog/javascript-snake-game-tutorial
