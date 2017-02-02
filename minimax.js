const { transpose } = require('./util')
const BoardParser = require('./boardParser')

module.exports = class Minimax {
  constructor(outcome) {
    this.outcome = outcome
  }

  parser(board) {
    return new BoardParser(board)
  }

  score(board, selectedMarker, currentMarker) {
    if (selectedMarker === currentMarker) {
      if (this.inPositionToWin(board, selectedMarker)) {
        return 10
      }
    }

    return -10
  }

  inPositionToWin(board, marker) {
    const parser = this.parser(board)

    return (
      (parser.inPositionDiagonally(marker)) ||
        (parser.inPositionHorizontally(marker)) ||
          (parser.inPositionVertically(marker))
    )
  }
}
