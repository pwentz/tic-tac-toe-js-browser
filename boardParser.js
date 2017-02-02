const { transpose } = require('./util')

module.exports = class BoardParser {
  constructor(board) {
    this.board = board
  }

  get transposedBoard() {
    return transpose(this.board)
  }

  inPositionDiagonally(marker, patternMatchingMarker) {
    const openings = this.getIndex(patternMatchingMarker)
    const markerLocations = this.getIndex(marker)
    const isOccupyingOneCorner = markerLocations.includes(0) && markerLocations.includes(8)
    const isOccupyingOtherCorner = markerLocations.includes(2) && markerLocations.includes(6)
    const isCenterOpen = openings.includes(4)

    return (isOccupyingOneCorner || isOccupyingOtherCorner) && isCenterOpen
  }

  inPositionHorizontally(marker, patternMatchingMarker, board = this.board) {
    let isInPosition;

    for (let i = 0 ; i < board.length ; i++) {
      if (i % 3 === 0) {
        const nextThree = board.slice(i, i + 3)
        const rowMarkers = nextThree.filter(m => m === marker)

        const isValid = patternMatchingMarker === marker ? rowMarkers.length === 3
                                                         : (rowMarkers.length === 2) && nextThree.includes(patternMatchingMarker)

        if (isValid) {
          isInPosition = true
        }
      }
    }

    return isInPosition || false
  }

  inPositionVertically(marker, patternMatchingMarker) {
    return this.inPositionHorizontally(marker, patternMatchingMarker, this.transposedBoard)
  }

  getIndex(marker) {
    return this.board.reduce((result, m, index) => {
      if (marker === m) return [...result, index]
      return result
    }, [])
  }
}
