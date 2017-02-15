const BoardDimensions = require('./boardDimensions')

class Outcome {
  constructor(dimensions) {
    this.dimensions = dimensions
  }

  didWinDiagonally(board, selectedMarker) {
    const dimensions = this.dimensions
    const upwardDiagonal = dimensions.upwardDiagonals
    const downwardDiagonal = dimensions.downwardDiagonals
    const mySpaces = board.indicesOf(selectedMarker)

    const isMySpaceOccupying = num => mySpaces.includes(num)

    if (upwardDiagonal.every(isMySpaceOccupying)) {
      return true
    }

    if (downwardDiagonal.every(isMySpaceOccupying)) {
      return true
    }

    return false
  }

  didWinHorizontallyOrVertically(structure, board, marker, condition) {
    const dimensions = this.dimensions
    const { gameLength, totalCells } = dimensions

    for (let i = 0 ; i < totalCells ; i++) {
      if (condition(i, gameLength)) {
        const winningSetup = dimensions[structure](i)
        const myPositions = board.indicesOf(marker)
        const didWin = winningSetup.every(i => myPositions.includes(i))

        if (didWin) return true
      }
    }

    return false
  }

  didWinHorizontally(board, selectedMarker) {
    const isBeginningOfRow = (num, gameLength) => num % gameLength === 0

    return this.didWinHorizontallyOrVertically('row', board, selectedMarker, isBeginningOfRow)
  }

  didWinVertically(board, selectedMarker) {
    const isTopOfColumn = (num, gameLength) => num < gameLength

    return this.didWinHorizontallyOrVertically('column', board, selectedMarker, isTopOfColumn)
  }

  didWin(board, selectedMarker) {
    return this.didWinDiagonally(board, selectedMarker) ||
            this.didWinHorizontally(board, selectedMarker) ||
             this.didWinVertically(board, selectedMarker)
  }

  isGameOver(board, marker) {
    return this.didWin(board, marker) || !board.openSpaces.length
  }
}

module.exports = Outcome
