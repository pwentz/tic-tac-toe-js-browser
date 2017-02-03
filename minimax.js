const { transpose } = require('./util')
const BoardParser = require('./boardParser')

module.exports = class Minimax {
  constructor(outcome) {
    this.outcome = outcome
  }

  get parser() {
    return new BoardParser()
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
    const parser = this.parser
    parser.board = board

    return (
      parser.indexOfWinningPositionDiagonally(marker) ||
        parser.indexOfWinningPositionHorizontally(marker) ||
          parser.indexOfWinningPositionVertically(marker)
    )
  }
}
