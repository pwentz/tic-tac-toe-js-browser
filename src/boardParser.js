module.exports = class BoardParser {
  constructor(board) {
    this.board = board
    this.dimensions = board.dimensions
  }

  hasWinningSetup(winningSetup, markerPositions) {
    return (markerPositions.length === (this.dimensions.boardSize - 1)) &&
            (winningSetup.some(i => this.board.isOpen(i)))
  }

  indexOfWinningPositionDiagonally(marker) {
    const { downwardDiagonals, upwardDiagonals, boardSize } = this.dimensions
    const myPositions = this.board.indicesOf(marker)
    const myDownwardPositions = downwardDiagonals.filter(num => myPositions.includes(num))
    const myUpwardPositions = upwardDiagonals.filter(num => myPositions.includes(num))

    if (this.hasWinningSetup(downwardDiagonals, myDownwardPositions)) {
      return downwardDiagonals.find(i => this.board.isOpen(i))
    }

    if (this.hasWinningSetup(upwardDiagonals, myUpwardPositions)) {
      return upwardDiagonals.find(i => this.board.isOpen(i))
    }

    return -1
  }

  getNonDiagonalIndex(rowOrColumn, marker, isFirstOfCollection) {
    const { boardSize, count } = this.dimensions

    for (let i = 0 ; i < count ; i++) {
      if (isFirstOfCollection(i, boardSize)) {
        const indicesOfAlignment = this.dimensions[rowOrColumn](i);
        const myPositions = indicesOfAlignment.filter(num => this.board.indicesOf(marker).includes(num))


        if (this.hasWinningSetup(indicesOfAlignment, myPositions)) {
          return indicesOfAlignment.find(i => this.board.isOpen(i))
        }
      }
    }

    return -1
  }

  indexOfWinningPositionHorizontally(marker) {
    const isBeginningOfRow = (num, boardSize) => (num % boardSize) === 0

    return this.getNonDiagonalIndex('row', marker, isBeginningOfRow)
  }

  indexOfWinningPositionVertically(marker) {
    const isTopOfColumn = (num, boardSize) => num < boardSize

    return this.getNonDiagonalIndex('column', marker, isTopOfColumn)
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

}
