module.exports = class MarkerFinder {
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

  parseDownwardDiagonal(marker, onGameOver, onWinningSetup) {
    const { downwardDiagonals, boardSize } = this.dimensions

    if (this.isGameOver(downwardDiagonals, marker)) {
      onGameOver({ marker, positions: downwardDiagonals })
      return
    }

    if (this.hasWinningSetup(downwardDiagonals, marker)) {
      onWinningSetup({ marker, position: downwardDiagonals.find(this.isOpen) })
      return
    }
  }

  parseUpwardDiagonal(marker, onGameOver, onWinningSetup) {
    const { upwardDiagonals, boardSize } = this.dimensions

    if (this.isGameOver(upwardDiagonals, marker)) {
      onGameOver({ marker, positions: upwardDiagonals })
      return
    }

    if (this.hasWinningSetup(upwardDiagonals, marker)) {
      onWinningSetup({ marker, position: upwardDiagonals.find(this.isOpen) })
      return
    }
  }

  parseHorizontal(marker, onGameOver, onWinningSetup) {
    const { boardSize, count } = this.dimensions

    for (let i = 0 ; i < count ; i++) {
      if ((i % boardSize) === 0) {
        const alignedIndices = this.dimensions.row(i)

        if (this.isGameOver(alignedIndices, marker)) {
          onGameOver({ marker, positions: alignedIndices })
          return
        }

        if (this.hasWinningSetup(alignedIndices, marker)) {
          onWinningSetup({ marker, position: alignedIndices.find(this.isOpen) })
          return
        }
      }
    }
  }

  parseVertical(marker, onGameOver, onWinningSetup) {
    const { boardSize, count } = this.dimensions

    for (let i = 0 ; i < count ; i++) {
      if (i < boardSize) {
        const alignedIndices = this.dimensions.column(i)

        if (this.isGameOver(alignedIndices, marker)) {
          onGameOver({ marker, positions: alignedIndices })
          return
        }

        if (this.hasWinningSetup(alignedIndices, marker)) {
          onWinningSetup({ marker, position: alignedIndices.find(this.isOpen) })
          return
        }
      }
    }
  }

  findMarker(marker, onGameOver, onWinningSetup) {
    this.parseDownwardDiagonal(marker, onGameOver, onWinningSetup)
    this.parseUpwardDiagonal(marker, onGameOver, onWinningSetup)
    this.parseHorizontal(marker, onGameOver, onWinningSetup)
    this.parseVertical(marker, onGameOver, onWinningSetup)
  }

  isBoardFull() {
    return this.board.isFull()
  }

}
