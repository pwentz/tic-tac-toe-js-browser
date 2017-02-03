const BoardParser = require('./boardParser')

class Outcome {

  static parser(board) {
    return new BoardParser(board)
  }

  static didWinDiagonally(board, selectedMarker) {
    const parser = this.parser(board)
    const mySpaces = parser.getIndex(selectedMarker)

    return (mySpaces.includes(0) && mySpaces.includes(4) && mySpaces.includes(8)) ||
      (mySpaces.includes(2) && mySpaces.includes(4) && mySpaces.includes(6))
  }

  static didWinHorizontally(board, selectedMarker) {
    for (let i = 0 ; i < board.length ; i++) {
      if (i % 3 === 0) {
        const nextThree = board.slice(i, i + 3)
        const rowMarkers = nextThree.filter(m => m === selectedMarker)

        if (rowMarkers.length === 3) return true
      }
    }

    return false
  }

  static didWinVertically(board, selectedMarker) {
    const parser = this.parser(board)
    return this.didWinHorizontally(parser.transposedBoard, selectedMarker)
  }
}

module.exports = Outcome
