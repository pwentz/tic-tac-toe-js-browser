module.exports = class BoardParser {
  constructor(dimensions) {
    this.dimensions = dimensions
  }

  indexOfWinningPositionDiagonally(board, marker) {
    const { downwardDiagonals, upwardDiagonals, boardSize } = this.dimensions
    const myPositions = board.indicesOf(marker)
    const myDownwardPositions = downwardDiagonals.filter(num => myPositions.includes(num))
    const myUpwardPositions = upwardDiagonals.filter(num => myPositions.includes(num))

    const hasWinningSetup = (winningSetup, mySetup) => {
      return (mySetup.length === (boardSize - 1)) &&
              (winningSetup.some(i => board.isOpen(i)))
    }

    if (hasWinningSetup(downwardDiagonals, myDownwardPositions)) {
      return downwardDiagonals.find(i => board.isOpen(i))
    }

    if (hasWinningSetup(upwardDiagonals, myUpwardPositions)) {
      return upwardDiagonals.find(i => board.isOpen(i))
    }

    return -1
  }

  getNonDiagonalIndex(rowOrColumn, board, marker, isFirstOfCollection) {
    const { boardSize, count } = this.dimensions

    for (let i = 0 ; i < count ; i++) {
      if (isFirstOfCollection(i, boardSize)) {
        const indicesOfAlignment = this.dimensions[rowOrColumn](i);
        const myPositions = indicesOfAlignment.filter(num => board.indicesOf(marker).includes(num))

        const hasWinningSetup = (winningSetup, mySetup) => {
          return (mySetup.length === (boardSize - 1)) &&
                  (winningSetup.some(i => board.isOpen(i)))
        }

        if (hasWinningSetup(indicesOfAlignment, myPositions)) {
          return indicesOfAlignment.find(i => board.isOpen(i))
        }
      }
    }

    return -1
  }

  indexOfWinningPositionHorizontally(board, marker) {
    const isBeginningOfRow = (num, boardSize) => (num % boardSize) === 0

    return this.getNonDiagonalIndex('row', board, marker, isBeginningOfRow)
  }

  indexOfWinningPositionVertically(board, marker) {
    const isTopOfColumn = (num, boardSize) => num < boardSize

    return this.getNonDiagonalIndex('column', board, marker, isTopOfColumn)
  }

  indexOfWinningPosition(board, marker) {
    const diagonalPosition = this.indexOfWinningPositionDiagonally(board, marker)
    const horizontalPosition = this.indexOfWinningPositionHorizontally(board, marker)
    const verticalPosition = this.indexOfWinningPositionVertically(board, marker)

    if (diagonalPosition >= 0) return diagonalPosition
    if (horizontalPosition >= 0) return horizontalPosition
    if (verticalPosition >= 0) return verticalPosition

    return -1
  }

}
