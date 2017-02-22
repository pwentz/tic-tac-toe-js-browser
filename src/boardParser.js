const FinalOutcome = require('./finalOutcome')
const EventualOutcome = require('./eventualOutcome')
const NullOutcome = require('./nullOutcome')

module.exports = class BoardParser {
  constructor(board) {
    this.board = board
    this.dimensions = board.dimensions

    this.isOpen = this.isOpen.bind(this)
  }

  isOpen(i) {
    return this.board.isOpen(i)
  }

  hasWinningSetup(winningSetup, marker) {
    const matchingPositions = winningSetup.filter((num) => {
      return this.board.indicesOf(marker).includes(num)
    })

    return (matchingPositions.length === (this.dimensions.boardSize - 1)) &&
            (winningSetup.some(this.isOpen))
  }

  isGameOver(idealSetup, marker) {
    const alignedMarkers =  idealSetup.filter((num) => {
      return this.board.indicesOf(marker).includes(num)
    })

    return alignedMarkers.length === this.dimensions.boardSize
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

    const finalOutcome = outcomes.find(o => o.isOver)

    if (finalOutcome) {
      return finalOutcome
    }

    const eventualOutcome = outcomes.find(o => o.willWin)

    if (eventualOutcome) {
      return eventualOutcome
    }

    if (this.board.isFull()) {
      return new FinalOutcome({ marker: null, positions: [] })
    }

    return new NullOutcome({ marker })
  }
}
