const BoardDimensions = require('./boardDimensions')

module.exports = class BoardParser {
  static dimensions(board) {
    return new BoardDimensions(Math.sqrt(board.state.length))
  }

  static hasWinningSetup(trio, markersInTrio) {
    return markersInTrio.length === 2 && trio.includes(' ')
  }

  static indexOfWinningPositionDiagonally(board, marker) {
    const dimensions = this.dimensions(board)
    const { downwardDiagonals, upwardDiagonals, gameLength } = dimensions
    const myPositions = board.indicesOf(marker)
    const myDownwardPositions = downwardDiagonals.filter(num => myPositions.includes(num))
    const myUpwardPositions = upwardDiagonals.filter(num => myPositions.includes(num))

    const hasWinningSetup = (idealSetup, mySetup) => {
      return (mySetup.length === (gameLength - 1)) &&
              (idealSetup.some(i => board.isOpen(i)))
    }

    if (hasWinningSetup(downwardDiagonals, myDownwardPositions)) {
      return downwardDiagonals.find(i => board.isOpen(i))
    }

    if (hasWinningSetup(upwardDiagonals, myUpwardPositions)) {
      return upwardDiagonals.find(i => board.isOpen(i))
    }

    return -1
  }

  static indexOfWinningPositionHorizontally(board, marker) {
    for (let i = 0 ; i < board.state.length ; i++) {
      const isBeginningOfRow = i % 3 === 0

      if (isBeginningOfRow) {
        const row = board.state.slice(i, i + 3)
        const rowMarkers = row.filter(m => m === marker)

        if (this.hasWinningSetup(row, rowMarkers)) {
          return row.indexOf(' ') + i
        }
      }
    }

    return -1
  }

  static indexOfWinningPositionVertically(board, marker) {
    for (let i = 0 ; i < board.state.length ; i++) {
      const isTopOfColumn = i < 3

      if (isTopOfColumn) {
        const column = [board.state[i], board.state[i + 3], board.state[i + 6]]
        const columnMarkers = column.filter(m => m === marker)

        if (this.hasWinningSetup(column, columnMarkers)) {
          return (column.indexOf(' ') * 3) + i
        }
      }
    }

    return -1
  }

  static indexOfWinningPosition(board, marker) {
    const diagonalPosition = this.indexOfWinningPositionDiagonally(board, marker)
    const horizontalPosition = this.indexOfWinningPositionHorizontally(board, marker)
    const verticalPosition = this.indexOfWinningPositionVertically(board, marker)

    if (diagonalPosition >= 0) return diagonalPosition
    if (horizontalPosition >= 0) return horizontalPosition
    if (verticalPosition >= 0) return verticalPosition

    return -1
  }

}
