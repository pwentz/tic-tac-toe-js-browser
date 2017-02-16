class Outcome {
  constructor(dimensions) {
    this.dimensions = dimensions
  }

  didWinDiagonally(board, selectedMarker) {
    const { upwardDiagonals, downwardDiagonals } = this.dimensions
    const mySpaces = board.indicesOf(selectedMarker)

    const isMySpaceOccupying = num => mySpaces.includes(num)

    if (upwardDiagonals.every(isMySpaceOccupying)) {
      return upwardDiagonals
    }

    if (downwardDiagonals.every(isMySpaceOccupying)) {
      return downwardDiagonals
    }

    return false
  }

  didWinHorizontallyOrVertically(rowOrColumn, board, marker, isFirstOfCollection) {
    const { boardSize, count } = this.dimensions

    for (let i = 0 ; i < count ; i++) {
      if (isFirstOfCollection(i, boardSize)) {
        const indicesOfAlignment = this.dimensions[rowOrColumn](i)
        const myPositions = board.indicesOf(marker)
        const didWin = indicesOfAlignment.every(i => myPositions.includes(i))

        if (didWin) return indicesOfAlignment
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
