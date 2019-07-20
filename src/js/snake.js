const board = []
const boardWidth = 26
const boardHeight = 16

var snakeX
var snakeY
var snakeDirection
var snakeLength

function start () {
  snakeX = Math.floor(boardWidth / 2)
  snakeY = Math.floor(boardHeight / 2)
  snakeLength = 5
  snakeDirection = 'Up'

  board[snakeY][snakeX].snake = 1
} // End start

function createBoard () {
  const boardDiv = document.getElementById('board')

  for (let y = 0; y < boardHeight; y++) {
    const row = []

    for (let x = 0; x < boardWidth; x++) {
      const cell = {
        snake: 0
      }

      cell.element = document.createElement('div')
      boardDiv.appendChild(cell.element)

      row.push(cell)
    } // End for

    board.push(row)
  } // End for
} // End createBoard

function init () {
  createBoard()
  start()
} // End init