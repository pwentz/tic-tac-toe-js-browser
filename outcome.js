const BoardParser = require('./boardParser')

module.exports = class Outcome {

  static parser(board) {
    return new BoardParser(board)
  }

  static didWinDiagonally(board, selectedMarker) {
    const parser = this.parser(board)
    return parser.inPositionDiagonally(selectedMarker, selectedMarker)
  }

  static didWinHorizontally(board, selectedMarker) {
    const parser = this.parser(board)
    return parser.inPositionHorizontally(selectedMarker, selectedMarker)
  }

  static didWinVertically(board, selectedMarker) {
    const parser = this.parser(board)
    return parser.inPositionVertically(selectedMarker, selectedMarker)
  }
}
