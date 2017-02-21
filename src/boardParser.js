const FinalOutcome = require('./finalOutcome')
const EventualOutcome = require('./eventualOutcome')
const NullOutcome = require('./nullOutcome')

module.exports = class BoardParser {
  constructor(board) {
    this.board = board
    this.dimensions = board.dimensions

    this.isOpen = this.isOpen.bind(this)
  }

  hasWinningSetup(winningSetup, marker) {
    const matchingPositions = winningSetup.filter(num => this.board.indicesOf(marker).includes(num))

    return (matchingPositions.length === (this.dimensions.boardSize - 1)) &&
            (winningSetup.some(this.isOpen))
  }

  isGameOver(idealSetup, marker) {
    return idealSetup.filter(num => this.board.indicesOf(marker).includes(num)).length === this.dimensions.boardSize
  }

  isOpen(index) {
    return this.board.isOpen(index)
  }

  parseDiagonal(marker) {
    const { downwardDiagonals, upwardDiagonals, boardSize } = this.dimensions

    if (this.isGameOver(downwardDiagonals, marker)) {
      return new FinalOutcome({ marker, positions: downwardDiagonals })
    }

    if (this.isGameOver(upwardDiagonals, marker)) {
      return new FinalOutcome({ marker, positions: upwardDiagonals })
    }

    if (this.hasWinningSetup(downwardDiagonals, marker)) {
      return new EventualOutcome({ marker,
                                   position: downwardDiagonals.find(this.isOpen) })
    }

    if (this.hasWinningSetup(upwardDiagonals, marker)) {
      return new EventualOutcome({ marker,
                                   position: upwardDiagonals.find(this.isOpen) })
    }

    return new NullOutcome({ marker })
  }

  parseHorizontal(marker) {
    const { boardSize, count } = this.dimensions

    for (let i = 0 ; i < count ; i++) {
      if ((i % boardSize) === 0) {
        const alignedIndices = this.dimensions.row(i)

        if (this.isGameOver(alignedIndices, marker)) {
          return new FinalOutcome({ marker,
                                    positions: alignedIndices })
        }

        if (this.hasWinningSetup(alignedIndices, marker)) {
          return new EventualOutcome({ marker,
                                       position: alignedIndices.find(this.isOpen) })
        }
      }
    }

    return new NullOutcome({ marker })
  }

  parseVertical(marker) {
    const { boardSize, count } = this.dimensions

    for (let i = 0 ; i < count ; i++) {
      if (i < boardSize) {
        const alignedIndices = this.dimensions.column(i)

        if (this.isGameOver(alignedIndices, marker)) {
          return new FinalOutcome({ marker,
                                    positions: alignedIndices })
        }

        if (this.hasWinningSetup(alignedIndices, marker)) {
          return new EventualOutcome({ marker,
                                       position: alignedIndices.find(this.isOpen) })
        }
      }
    }

    return new NullOutcome({ marker })
  }

  parse(marker) {
    const outcomes = [this.parseDiagonal(marker), this.parseHorizontal(marker), this.parseVertical(marker)]

    const finalOutcome = outcomes.find(o => o.constructor === FinalOutcome)

    if (finalOutcome) {
      return finalOutcome
    }

    const eventualOutcome = outcomes.find(o => o.constructor === EventualOutcome)

    if (eventualOutcome) {
      return eventualOutcome
    }

    if (this.board.isFull()) {
      return new FinalOutcome({ marker: null, positions: [] })
    }

    return new NullOutcome({ marker })
  }

//   indexOfWinningPositionDiagonally(marker) {
//     const { downwardDiagonals, upwardDiagonals, boardSize } = this.dimensions
//     const myPositions = this.board.indicesOf(marker)
//     const myDownwardPositions = downwardDiagonals.filter(num => myPositions.includes(num))
//     const myUpwardPositions = upwardDiagonals.filter(num => myPositions.includes(num))

//     if (this.hasWinningSetup(downwardDiagonals, myDownwardPositions)) {
//       return downwardDiagonals.find(i => this.board.isOpen(i))
//     }

//     if (this.hasWinningSetup(upwardDiagonals, myUpwardPositions)) {
//       return upwardDiagonals.find(i => this.board.isOpen(i))
//     }

//     return -1
//   }

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
