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
      return upwardDiagonal
    }

    if (downwardDiagonal.every(isMySpaceOccupying)) {
      return downwardDiagonal
    }

    return false
  }

  didWinHorizontallyOrVertically(rowOrColumn, board, marker, isFirstOfCollection) {
    const dimensions = this.dimensions
    const { boardSize, count } = dimensions

    for (let i = 0 ; i < count ; i++) {
      if (isFirstOfCollection(i, boardSize)) {
        const winningSetup = dimensions[rowOrColumn](i)
        const myPositions = board.indicesOf(marker)
        const didWin = winningSetup.every(i => myPositions.includes(i))

        if (didWin) return winningSetup
      }
    }

    return false
  }

  didWinHorizontally(board, selectedMarker) {
    const isBeginningOfRow = (num, boardSize) => num % boardSize === 0

    return this.didWinHorizontallyOrVertically('row', board, selectedMarker, isBeginningOfRow)
  }

  didWinVertically(board, selectedMarker) {
    const isTopOfColumn = (num, boardSize) => num < boardSize

    return this.didWinHorizontallyOrVertically('column', board, selectedMarker, isTopOfColumn)
  }

  didWin(board, selectedMarker) {
    return this.didWinDiagonally(board, selectedMarker) ||
            this.didWinHorizontally(board, selectedMarker) ||
             this.didWinVertically(board, selectedMarker)
  }

  isGameOver(board, marker) {
    return this.didWin(board, marker) || board.isFull()
  }
}

module.exports = Outcome
