module.exports = class BoardParser {
  constructor(dimensions) {
    this.dimensions = dimensions
  }

  indexOfWinningPositionDiagonally(board, marker) {
    const dimensions = this.dimensions
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

  indexOfWinnerHorizontallyOrVertically(structure, board, marker, condition) {
    const dimensions = this.dimensions
    const { gameLength, totalCells } = dimensions

    for (let i = 0 ; i < totalCells ; i++) {
      if (condition(i, gameLength)) {
        const winningElements = dimensions[structure](i);
        const myPositions = winningElements.filter(num => board.indicesOf(marker).includes(num))

        const hasWinningSetup = (winningSetup, mySetup) => {
          return (mySetup.length === (gameLength - 1)) &&
                  (winningSetup.some(i => board.isOpen(i)))
        }

        if (hasWinningSetup(winningElements, myPositions)) {
          return winningElements.find(i => board.isOpen(i))
        }
      }
    }

    return -1
  }

  indexOfWinningPositionHorizontally(board, marker) {
    const isBeginningOfRow = (num, gameLength) => (num % gameLength) === 0

    return this.indexOfWinnerHorizontallyOrVertically('row', board, marker, isBeginningOfRow)
  }

  indexOfWinningPositionVertically(board, marker) {
    const isTopOfColumn = (num, gameLength) => num < gameLength

    return this.indexOfWinnerHorizontallyOrVertically('column', board, marker, isTopOfColumn)
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
