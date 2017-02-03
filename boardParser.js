const { transpose } = require('./util')

module.exports = class BoardParser {
  constructor(board) {
    this.board = board
  }

  get transposedBoard() {
    return transpose(this.board)
  }

  hasWinningSetup(trio, markersInTrio) {
    return markersInTrio.length === 2 && trio.includes(' ')
  }

  indexOfWinningPositionDiagonally(marker) {
    const downwardSlope = [this.board[0], this.board[4], this.board[8]]
    const upwardSlope = [this.board[2], this.board[4], this.board[6]]

    const downwardMarkers = downwardSlope.filter(m => m === marker)
    const upwardMarkers = upwardSlope.filter(m => m === marker)

    if (this.hasWinningSetup(downwardSlope, downwardMarkers)) {
      const mappedIndices = {
        0: 0,
        1: 4,
        2: 8
      }

      return mappedIndices[downwardSlope.indexOf(' ')]
    }

    if (this.hasWinningSetup(upwardSlope, upwardMarkers)) {
      const mappedIndices = {
        0: 2,
        1: 4,
        2: 6
      }

      return mappedIndices[upwardSlope.indexOf(' ')]
    }

    return -1
  }

  indexOfWinningPositionHorizontally(marker) {
    for (let i = 0 ; i < this.board.length ; i++) {
      const isBeginningOfRow = i % 3 === 0

      if (isBeginningOfRow) {
        const row = this.board.slice(i, i + 3)
        const rowMarkers = row.filter(m => m === marker)

        if (this.hasWinningSetup(row, rowMarkers)) {
          return row.indexOf(' ') + i
        }
      }
    }

    return -1
  }

  indexOfWinningPositionVertically(marker) {
    for (let i = 0 ; i < this.board.length ; i++) {
      const isTopOfColumn = i < 3

      if (isTopOfColumn) {
        const column = [this.board[i], this.board[i + 3], this.board[i + 6]]
        const columnMarkers = column.filter(m => m === marker)

        if (this.hasWinningSetup(column, columnMarkers)) {
          return (column.indexOf(' ') * 3) + i
        }
      }
    }

    return -1
  }

  indexOfWinningPosition(marker) {
    const diagonalPosition = this.indexOfWinningPositionDiagonally(marker)
    const horizontalPosition = this.indexOfWinningPositionHorizontally(marker)
    const verticalPosition = this.indexOfWinningPositionVertically(marker)

    if (diagonalPosition >= 0) return diagonalPosition
    if (horizontalPosition >= 0) return horizontalPosition
    if (verticalPosition >= 0) return verticalPosition

    return -1
  }

  getIndex(marker) {
    return this.board.reduce((result, m, index) => {
      if (marker === m) return [...result, index]
      return result
    }, [])
  }
}
