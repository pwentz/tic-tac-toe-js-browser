module.exports = class BoardParser {
  constructor(board) {
    this.board = board
    this.dimensions = board.dimensions
  }

  hasWinningSetup(winningSetup, markerPositions) {
    const matchingPositions = winningSetup.filter(num => markerPositions.includes(num))

    return (matchingPositions.length === (this.dimensions.boardSize - 1)) &&
            (winningSetup.some(i => this.board.isOpen(i)))
  }

  isGameOver(idealSetup, markerPositions) {
    return idealSetup.filter(num => markerPositions.includes(num)).length === this.dimensions.boardSize
  }

  parseDiagonal(marker) {
    const { downwardDiagonals, upwardDiagonals, boardSize } = this.dimensions
    const myPositions = this.board.indicesOf(marker)

    if (this.isGameOver(downwardDiagonals, myPositions)) {
      return {
        isGameOver: true,
        marker,
        winningPositions: downwardDiagonals
      }
    }

    if (this.isGameOver(upwardDiagonals, myPositions)) {
      return {
        isGameOver: true,
        marker,
        winningPositions: upwardDiagonals
      }
    }

    if (this.hasWinningSetup(downwardDiagonals, myPositions)) {
      return {
        isGameOver: false,
        marker,
        winningIndex: downwardDiagonals.find(i => this.board.isOpen(i))
      }
    }

    if (this.hasWinningSetup(upwardDiagonals, myPositions)) {
      return {
        isGameOver: false,
        marker,
        winningIndex: upwardDiagonals.find(i => this.board.isOpen(i))
      }
    }

    return -1
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
