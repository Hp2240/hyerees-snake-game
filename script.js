let lastTime = 0
let inputDirection = { x: 0, y: 0 }
let lastDirection = { x: 0, y: 0 }
let food = {
  x: Math.floor(Math.random() * 18) + 1,
  y: Math.floor(Math.random() * 18) + 1
}
const speed = 5
const snake = [{ x: 10, y: 10 }]
const board = document.getElementById('board')
const incrementRate = 1
const snakeIncrement = 0

function main(currentTime) {
  // to perform animation and req
  window.requestAnimationFrame(main)
  if ((currentTime - lastTime) / 1000 < 1 / speed) {
    return
  }
  // console.log('rendered')
  lastTime = currentTime
  // console.log(currentTime)
  update()
  board.innerHTML = ''
  draw(board)
}

function update() {
  // update position of the snake
  inputDirection = direction()
  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] }
  }
  snake[0].x += inputDirection.x
  snake[0].y += inputDirection.y

  // update food randomly
  if (eatFood(food)) {
    incrementSnake(rate)
  }
}

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
    if (lastDirection.x !== 0) {
    } else inputDirection = { x: 1, y: 0 }
  }
  // down
  if (e.keyCode === 40) {
    if (lastDirection.y !== 0) {
    } else inputDirection = { x: 0, y: 1 }
  }
}

function incrementSnake(rate) {
  snakeIncrement += rate
}

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
    }
  }
}

function foodRandomPosition() {
  xPosition = Math.floor(Math.random() * 18) + 1
  yPosition = Math.floor(Math.random() * 18) + 1
  let valid = false
  while (!valid) {
    for (let i = 0; i < snake.length; i++) {
      if (xPosition !== snake[i].x && yPosition !== snake[i].y) {
        valid = true
      } else {
        break
      }
    }
    xPosition = Math.floor(Math.random() * 18) + 1
    yPosition = Math.floor(Math.random() * 18) + 1
  }
  return [xPosition, yPosition]
}

// https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame
