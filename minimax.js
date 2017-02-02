module.exports = class Minimax {
  constructor(outcome) {
    this.outcome = outcome
  }

  score(board, selectedMarker, currentMarker) {
    if (selectedMarker === currentMarker) {
      if (this.inPositionDiagonally(board, selectedMarker)) {
        return 10
      }

      if (this.inPositionHorizontally(board, selectedMarker)) {
        return 10
      }

      if (this.inPositionVertically(board, selectedMarker)) {
        return 10
      }
    }

    return -10
  }

  inPositionHorizontally(board, marker) {
    let isInPosition;

    for (let i = 0 ; i < board.length ; i++) {
      const nextThree = board.slice(i, i + 3)
      const rowMarkers = nextThree.filter(m => m === marker)

      if ((rowMarkers.length === 2) && nextThree.includes(' ')) {
        isInPosition = true
      }
    }

    return isInPosition || false
  }

  inPositionDiagonally(board, selectedMarker) {
    const openings = this.outcome.openSpaces(board)
    const markerLocations = this.outcome.getIndex(board, selectedMarker)

    return (markerLocations.includes(0) && markerLocations.includes(8)) ||
    ((markerLocations.includes(2) && markerLocations.includes(6)) && openings.includes(4))
  }

  inPositionVertically(board, marker) {
    const leftColumn = [board[0], board[3], board[6]]
    const middleColumn = [board[1], board[4], board[7]]
    const rightColumn = [board[2], board[5], board[8]]

    const leftColumnMarkers = leftColumn.filter(m => m === marker)
    const middleColumnMarkers = middleColumn.filter(m => m === marker)
    const rightColumnMarkers = rightColumn.filter(m => m === marker)

    if ((leftColumnMarkers.length === 2) && leftColumn.includes(' ')) return true
    if ((middleColumnMarkers.length === 2) && middleColumn.includes(' ')) return true
    if ((rightColumnMarkers.length === 2) && rightColumn.includes(' ')) return true
  }
}
