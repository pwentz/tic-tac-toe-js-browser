const R = require('ramda')

const splitBoard = (board) => {
  return [board.slice(0, 3),
          board.slice(3, 6),
          board.slice(6, 9)]
}

const flatten = (nestedBoard) => {
  return nestedBoard.reduce((res, i) => [...res, ...i], [])
}

module.exports = {
  transpose(board) {
    return flatten(R.transpose(splitBoard(board)))
  }
}
