const board = []
const boardWidth = 26
const boardHeight = 16

var snakeX
var snakeY
var snakeDirection
var snakeLength

function placeApple () {
  let appleX
  let appleY

  // Prevent apple from spawning on snake.
  do {
    appleX = Math.floor(Math.random() * boardWidth)
    appleY = Math.floor(Math.random() * boardHeight)
  } while (board[appleY][appleX].snake !== 0)

  board[appleY][appleX].apple = 1
} // End placeApple

function wallHit () {
  return snakeX < 0 || snakeY < 0 || snakeX >= boardWidth || snakeY >= boardHeight
} // End wallHit

function keyPress (event) {
  switch (event.key) {
    case 'ArrowUp': snakeDirection = snakeDirection === 'Down' ? 'Down' : 'Up'; break
    case 'ArrowDown': snakeDirection = snakeDirection === 'Up' ? 'Up' : 'Down'; break
    case 'ArrowLeft': snakeDirection = snakeDirection === 'Right' ? 'Right' : 'Left'; break
    case 'ArrowRight': snakeDirection = snakeDirection === 'Left' ? 'Left' : 'Right'; break
    default: return
  } // End Switch

  event.preventDefault()
} // End keyPress

function gameLoop () {
  switch (snakeDirection) {
    case 'Up': snakeY--; break
    case 'Down': snakeY++; break
    case 'Left': snakeX--; break
    case 'Right': snakeX++; break
  } // End Switch

  if (wallHit()) {
    startGame()
  } // End if

  if (board[snakeY][snakeX].snake > 0) {
    startGame()
  } // End if

  if (board[snakeY][snakeX].apple === 1) {
    snakeLength++
    board[snakeY][snakeX].apple = 0
    placeApple()
  } // End if

  board[snakeY][snakeX].snake = snakeLength

  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      const cell = board[y][x]

      if (cell.snake > 0) {
        cell.element.className = 'snake'
        cell.snake--
      } else if (cell.apple === 1) {
        cell.element.className = 'apple'
      } else {
        cell.element.className = ''
      } // End if
    } // End for
  } // End for

  setTimeout(gameLoop, 150)
} // End gameLoop

function startGame () {
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      board[y][x].snake = 0
      board[y][x].apple = 0
    } // End for
  } // End for

  snakeX = Math.floor(boardWidth / 2)
  snakeY = Math.floor(boardHeight / 2)
  snakeLength = 5
  snakeDirection = 'Up'

  board[snakeY][snakeX].snake = snakeLength

  placeApple()

  gameLoop()
} // End startGame

function initGame () {
  const boardDiv = document.getElementById('board')

  for (let y = 0; y < boardHeight; y++) {
    const row = []

    for (let x = 0; x < boardWidth; x++) {
      const cell = {
        snake: 0,
        apple: 0
      } // End cell

      cell.element = document.createElement('div')
      boardDiv.appendChild(cell.element)

      row.push(cell)
    } // End for

    board.push(row)
  } // End for

  startGame()
} // End initGame