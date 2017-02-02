const { transpose } = require('./util')

module.exports = class BoardParser {
  constructor(board) {
    this.board = board
  }

  get transposedBoard() {
    return transpose(this.board)
  }

  inPositionDiagonally(marker) {
    const openings = this.getIndex(' ')
    const markerLocations = this.getIndex(marker)
    const isOccupyingOneCorner = markerLocations.includes(0) && markerLocations.includes(8)
    const isOccupyingOtherCorner = markerLocations.includes(2) && markerLocations.includes(6)
    const isCenterOpen = openings.includes(4)

    return (isOccupyingOneCorner || isOccupyingOtherCorner) && isCenterOpen
  }

  inPositionHorizontally(marker, board = this.board) {
    let isInPosition;

    for (let i = 0 ; i < board.length ; i++) {
      if (i % 3 === 0) {
        const nextThree = board.slice(i, i + 3)
        const rowMarkers = nextThree.filter(m => m === marker)

        if ((rowMarkers.length === 2) && nextThree.includes(' ')) {
          isInPosition = true
        }
      }
    }

    return isInPosition || false
  }

  inPositionVertically(marker) {
    return this.inPositionHorizontally(marker, this.transposedBoard)
  }

  getIndex(marker) {
    return this.board.reduce((result, m, index) => {
      if (marker === m) return [...result, index]
      return result
    }, [])
  }
}
