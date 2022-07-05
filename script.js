let lastTime = 0
let inputDirection = { x: 0, y: 0 }
let lastDirection = { x: 0, y: 0 }
const speed = 2
const snake = [{ x: 10, y: 10 }]
const board = document.getElementById('board')

function main(currentTime) {
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
  inputDirection = direction()
  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] }
  }
  snake[0].x += inputDirection.x
  snake[0].y += inputDirection.y
}

function draw(board) {
  snake.forEach((position) => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = position.y
    snakeElement.style.gridColumnStart = position.x
    snakeElement.classList.add('snake')
    board.appendChild(snakeElement)
  })
}

function direction() {
  return inputDirection
}

window.requestAnimationFrame(main)

// left = 37
// up = 38
// right = 39
// down = 40
window.addEventListener('keyDown', (e) => {
  if (e.keyCode === 37 && lastDirection.x !== 0) {
    inputDirection = { x: -1, y: 0 }
  }
  if (e.keyCode === 38) {
    inputDirection = { x: 0, y: 1 }
  }
  if (e.keyCode === 39 && lastDirection.x !== 0) {
    inputDirection = { x: 1, y: 0 }
  }
  if (e.keyCode === 40) {
    inputDirection = { x: 0, y: -1 }
  }
})

direction()
