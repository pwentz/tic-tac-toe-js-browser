class ComputerPlayer {
  constructor({ self, opponent }) {
    this.self = self
    this.opponent = opponent
    this.newBoardLayout = []
  }

  openSpaces(board) {
    return this.getSpaces(board, '')
  }

  didWinDiagonally(board, selectedMarker) {
    const mySpaces = this.getSpaces(board, selectedMarker)

    return (mySpaces.includes(0) && mySpaces.includes(4) && mySpaces.includes(8)) ||
      (mySpaces.includes(2) && mySpaces.includes(4) && mySpaces.includes(6))
  }

  didWinHorizontally(board, selectedMarker) {
    return true
  }

  getSpaces(board, selectedMarker) {
    return board.reduce((result, marker, index) => {
      if (marker === selectedMarker) return [...result, index]
      return result
    }, [])
  }
}

// pass this into constructor for unit testability
module.exports = ComputerPlayer
