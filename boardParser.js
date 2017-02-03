const { transpose } = require('./util')

module.exports = class BoardParser {
  constructor(board) {
    this.board = board
  }

  get transposedBoard() {
    return transpose(this.board)
  }

  indexOfWinningPositionDiagonally(marker) {
    const openings = this.getIndex(' ')
    const markerLocations = this.getIndex(marker)

    const downwardSlope = [this.board[0], this.board[4], this.board[8]]
    const upwardSlope = [this.board[2], this.board[4], this.board[6]]

    const downwardMarkers = downwardSlope.filter(m => m === marker)
    const upwardMarkers = upwardSlope.filter(m => m === marker)

    if (downwardMarkers.length === 2 && downwardSlope.includes(' ')) {
      const options = {
        0: 0,
        1: 4,
        2: 8
      }

      return options[downwardSlope.indexOf(' ')]
    }

    if (upwardMarkers.length === 2 && upwardSlope.includes(' ')) {
      const options = {
        0: 2,
        1: 4,
        2: 6
      }

      return options[upwardSlope.indexOf(' ')]
    }

    return -1
  }

  indexOfWinningPositionHorizontally(marker, board = this.board) {
    for (let i = 0 ; i < board.length ; i++) {
      if (i % 3 === 0) {
        const nextThree = board.slice(i, i + 3)
        const rowMarkers = nextThree.filter(m => m === marker)

        if ((rowMarkers.length === 2) && nextThree.includes(' ')) {
          return nextThree.indexOf(' ') + i
        }
      }
    }

    return -1
  }

  indexOfWinningPositionVertically(marker, board = this.board) {
    for (let i = 0 ; i < board.length ; i++) {
      if (i < 3) {
        const column = [board[i], board[i + 3], board[i + 6]]
        const rowMarkers = column.filter(m => m === marker)

        if ((rowMarkers.length === 2) && column.includes(' ')) {
          return (column.indexOf(' ') * 3) + i
        }
      }
    }

    return -1
  }

  getIndex(marker) {
    return this.board.reduce((result, m, index) => {
      if (marker === m) return [...result, index]
      return result
    }, [])
  }
}
