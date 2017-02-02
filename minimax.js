module.exports = class Minimax {
  constructor(outcome) {
    this.outcome = outcome
  }

  score(board, selectedMarker, currentMarker) {
    const { outcome } = this
    const openings = outcome.openSpaces(board)
    const markerLocations = outcome.getIndex(board, selectedMarker)
    const hasDownwardDiagonal = (markerLocations.includes(0) && markerLocations.includes(8) && openings.includes(4))
    const hasUpwardDiagonal = (markerLocations.includes(2) && markerLocations.includes(6) && openings.includes(4))

    if (selectedMarker === currentMarker) {
      if (hasDownwardDiagonal || hasUpwardDiagonal) {
        return 10
      }
    }

    return -10
  }
}
