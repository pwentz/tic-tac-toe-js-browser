const BoardDimensions = require('./boardDimensions')

module.exports = class BoardParser {
  static dimensions(board) {
    return new BoardDimensions(Math.sqrt(board.state.length))
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

  static indexOfWinner(structure, board, marker, condition) {
    const dimensions = this.dimensions(board)
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

  static indexOfWinningPositionHorizontally(board, marker) {
    const isBeginningOfRow = (num, gameLength) => (num % gameLength) === 0

    return this.indexOfWinner('row', board, marker, isBeginningOfRow)
  }

  static indexOfWinningPositionVertically(board, marker) {
    const isTopOfColumn = (num, gameLength) => num < gameLength

    return this.indexOfWinner('column', board, marker, isTopOfColumn)
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
