const BoardParser = require('./boardParser')

class Outcome {

  static didWinDiagonally(board, selectedMarker) {
    const mySpaces = board.indicesOf(selectedMarker)

    return (mySpaces.includes(0) && mySpaces.includes(4) && mySpaces.includes(8)) ||
      (mySpaces.includes(2) && mySpaces.includes(4) && mySpaces.includes(6))
  }

  static didWinHorizontally(board, selectedMarker) {
    for (let i = 0 ; i < board.state.length ; i++) {
      if (i % 3 === 0) {
        const nextThree = board.state.slice(i, i + 3)
        const rowMarkers = nextThree.filter(m => m === selectedMarker)

        if (rowMarkers.length === 3) return true
      }
    }

    return false
  }

  static didWinVertically(board, selectedMarker) {
    return this.didWinHorizontally(board.transpose(), selectedMarker)
  }

  static didWin(board, selectedMarker) {
    return this.didWinDiagonally(board, selectedMarker) ||
            this.didWinHorizontally(board, selectedMarker) ||
             this.didWinVertically(board, selectedMarker)
  }
}

module.exports = Outcome
