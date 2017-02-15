const BoardDimensions = require('./boardDimensions')

class Outcome {
  static dimensions(board) {
    return new BoardDimensions(Math.sqrt(board.state.length))
  }

  static didWinDiagonally(board, selectedMarker) {
    const dimensions = this.dimensions(board)
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

  static didWinHorizontally(board, selectedMarker) {
    const gameLength = this.dimensions(board).gameLength

    for (let i = 0 ; i < board.state.length ; i++) {
      if (i % gameLength === 0) {
        const nextThree = board.state.slice(i, i + gameLength)
        const rowMarkers = nextThree.filter(m => m === selectedMarker)

        if (rowMarkers.length === gameLength) return true
      }
    }

    return false
  }

  static didWinVertically(board, selectedMarker) {
    const gameLength = this.dimensions(board).gameLength

    for (let i = 0 ; i < board.state.length ; i++) {
      const isTopOfColumn = i < gameLength

      if (isTopOfColumn) {
        const column = [board.state[i], board.state[i + gameLength], board.state[i + (gameLength * 2)]]
        const columnMarkers = column.filter(m => m === selectedMarker)

        if (columnMarkers.length === gameLength) return true
      }
    }

    return false
  }

  static didWin(board, selectedMarker) {
    return this.didWinDiagonally(board, selectedMarker) ||
            this.didWinHorizontally(board, selectedMarker) ||
             this.didWinVertically(board, selectedMarker)
  }

  static isGameOver(board, marker) {
    return this.didWin(board, marker) || !board.openSpaces.length
  }
}

module.exports = Outcome
