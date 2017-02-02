const { transpose } = require('./util')
const BoardParser = require('./boardParser')

module.exports = class Minimax {
  static parser(board) {
    return new BoardParser(board)
  }

  static score(board, selectedMarker, currentMarker) {
    if (selectedMarker === currentMarker) {
      if (this.inPositionToWin(board, selectedMarker)) {
        return 10
      }
    }

    return -10
  }

  static inPositionToWin(board, marker) {
    const parser = this.parser(board)

    return (
      (parser.inPositionDiagonally(marker, ' ')) ||
        (parser.inPositionHorizontally(marker, ' ')) ||
          (parser.inPositionVertically(marker, ' '))
    )
  }
}
